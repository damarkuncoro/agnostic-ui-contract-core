// src/validator/runtime.ts - Runtime contract validation
import fs from 'fs';
import path from 'path';
import { validateContract } from './index';
/**
 * Runtime contract validator that checks importing packages for guideline compliance
 */
class RuntimeContractValidator {
    constructor() {
        this.validatedPackages = new Set();
        this.isEnabled = true;
    }
    /**
     * Disable runtime validation (useful for testing or special cases)
     */
    disable() {
        this.isEnabled = false;
    }
    /**
     * Enable runtime validation
     */
    enable() {
        this.isEnabled = true;
    }
    /**
     * Validate the contract package that is importing contract-core
     */
    validateImportingPackage() {
        if (!this.isEnabled)
            return;
        try {
            // Find the importing package by walking up the call stack
            const importingPackagePath = this.findImportingContractPackage();
            if (!importingPackagePath) {
                // Not importing from a contract package, skip validation
                return;
            }
            const packageName = path.basename(importingPackagePath);
            // Skip if already validated
            if (this.validatedPackages.has(packageName)) {
                return;
            }
            // Mark as validated to avoid repeated checks
            this.validatedPackages.add(packageName);
            // Validate the contract
            const result = validateContract(importingPackagePath);
            if (!result.valid) {
                const errorMessage = this.formatValidationError(packageName, result);
                throw new Error(errorMessage);
            }
            // Log success in development
            if (process.env.NODE_ENV === 'development') {
                console.log(`✅ Contract validation passed: ${packageName}`);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            // Re-throw validation errors
            if (errorMessage.includes('Contract validation failed')) {
                throw error;
            }
            // Log other errors but don't fail the build
            if (process.env.NODE_ENV === 'development') {
                console.warn('⚠️ Contract validation warning:', errorMessage);
            }
        }
    }
    /**
     * Find the contract package that is importing contract-core
     */
    findImportingContractPackage() {
        try {
            // Get the current working directory (where the importing package is)
            const cwd = process.cwd();
            // Check if this is a contract package
            const packageJsonPath = path.join(cwd, 'package.json');
            if (!fs.existsSync(packageJsonPath)) {
                return null;
            }
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            // Check if it's a contract package
            if (packageJson.name && packageJson.name.includes('agnostic-ui-contract-')) {
                return cwd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Format validation errors for clear error messages
     */
    formatValidationError(packageName, result) {
        let message = `\n❌ CONTRACT VALIDATION FAILED: ${packageName}\n\n`;
        if (result.errors && result.errors.length > 0) {
            message += '🚨 CRITICAL ERRORS (must be fixed):\n';
            result.errors.forEach((error, index) => {
                message += `  ${index + 1}. ${error.code}: ${error.message}\n`;
                if (error.file) {
                    message += `     📁 File: ${error.file}\n`;
                }
            });
            message += '\n';
        }
        if (result.warnings && result.warnings.length > 0) {
            message += '⚠️ WARNINGS (should be addressed):\n';
            result.warnings.forEach((warning, index) => {
                message += `  ${index + 1}. ${warning.code}: ${warning.message}\n`;
            });
            message += '\n';
        }
        message += '💡 To fix these issues:\n';
        message += '   1. Check the contract development guidelines in contract-core README\n';
        message += '   2. Run: pnpm run validate:contracts:fix\n';
        message += '   3. Or manually fix the reported issues\n\n';
        message += '🔗 See: packages/agnostic-ui-contract-core/README.md#contract-validation\n';
        return message;
    }
}
// Global validator instance
const runtimeValidator = new RuntimeContractValidator();
// Export for external control
export { runtimeValidator as RuntimeContractValidator };
// Auto-run validation when this module is imported
runtimeValidator.validateImportingPackage();
// Export validator control functions
export const disableRuntimeValidation = () => runtimeValidator.disable();
export const enableRuntimeValidation = () => runtimeValidator.enable();
//# sourceMappingURL=runtime.js.map