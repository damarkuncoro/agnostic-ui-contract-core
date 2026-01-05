/**
 * Runtime contract validator that checks importing packages for guideline compliance
 */
declare class RuntimeContractValidator {
    private validatedPackages;
    private isEnabled;
    /**
     * Disable runtime validation (useful for testing or special cases)
     */
    disable(): void;
    /**
     * Enable runtime validation
     */
    enable(): void;
    /**
     * Validate the contract package that is importing contract-core
     */
    validateImportingPackage(): void;
    /**
     * Find the contract package that is importing contract-core
     */
    private findImportingContractPackage;
    /**
     * Format validation errors for clear error messages
     */
    private formatValidationError;
}
declare const runtimeValidator: RuntimeContractValidator;
export { runtimeValidator as RuntimeContractValidator };
export declare const disableRuntimeValidation: () => void;
export declare const enableRuntimeValidation: () => void;
//# sourceMappingURL=runtime.d.ts.map