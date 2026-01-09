"use strict";
/**
 * Shared validation utilities for contracts
 * Implements DRY principle by centralizing common validation logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_VARIANTS = void 0;
exports.validateInSet = validateInSet;
exports.validateAccessibility = validateAccessibility;
exports.validateKeyboardSupport = validateKeyboardSupport;
exports.validateVariant = validateVariant;
exports.validateEntityName = validateEntityName;
exports.combineValidationResults = combineValidationResults;
exports.createValidationResult = createValidationResult;
/**
 * Validates if a value is in an allowed set
 */
function validateInSet(value, allowedValues, fieldName) {
    if (value === undefined) {
        return { isValid: true };
    }
    if (!allowedValues.includes(value)) {
        return {
            isValid: false,
            error: `Invalid ${fieldName}: ${value}. Allowed values: ${allowedValues.join(', ')}`
        };
    }
    return { isValid: true };
}
/**
 * Validates accessibility features
 */
function validateAccessibility(accessibility) {
    const errors = [];
    const warnings = [];
    if (!accessibility) {
        return { isValid: true, errors, warnings };
    }
    // Validate ARIA live values
    const validAriaLive = ['off', 'polite', 'assertive'];
    if (accessibility.ariaLive && !validAriaLive.includes(accessibility.ariaLive)) {
        errors.push(`Invalid aria-live value: ${accessibility.ariaLive}`);
    }
    // Validate ARIA value relationships
    if (accessibility.ariaValueNow !== undefined) {
        if (accessibility.ariaValueMin !== undefined &&
            accessibility.ariaValueNow < accessibility.ariaValueMin) {
            errors.push('aria-valuenow cannot be less than aria-valuemin');
        }
        if (accessibility.ariaValueMax !== undefined &&
            accessibility.ariaValueNow > accessibility.ariaValueMax) {
            errors.push('aria-valuenow cannot be greater than aria-valuemax');
        }
    }
    // Warn about missing labels
    if (!accessibility.ariaLabel && !accessibility.ariaLabelledBy) {
        warnings.push('Consider adding aria-label or aria-labelledby for better accessibility');
    }
    return { isValid: errors.length === 0, errors, warnings };
}
/**
 * Validates keyboard support
 */
function validateKeyboardSupport(keyboardSupport) {
    const errors = [];
    const warnings = [];
    if (!keyboardSupport) {
        return { isValid: true, errors, warnings };
    }
    if (!keyboardSupport.supportedActions ||
        keyboardSupport.supportedActions.length === 0) {
        warnings.push('Keyboard support defined but no actions specified');
    }
    return { isValid: errors.length === 0, errors, warnings };
}
/**
 * Validates variant values (size, intent, tone, etc.)
 */
function validateVariant(value, allowedValues, variantType) {
    return validateInSet(value, allowedValues, `${variantType} variant`);
}
/**
 * Common variant validation sets
 */
exports.COMMON_VARIANTS = {
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    intents: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    tones: ['solid', 'outline', 'subtle', 'ghost', 'link'],
    emphases: ['low', 'medium', 'high'],
    radii: ['none', 'sm', 'md', 'lg', 'full'],
    shadows: ['sm', 'md', 'lg', 'xl', 'focus'],
    elevations: ['low', 'medium', 'high']
};
/**
 * Validates business rules for entity names
 */
function validateEntityName(name, entityType) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return {
            isValid: false,
            error: `${entityType} must have a valid name`
        };
    }
    // Validate name format (lowercase, alphanumeric, dashes)
    const validName = /^[a-z][a-z0-9-]*$/;
    if (!validName.test(name)) {
        return {
            isValid: false,
            error: `${entityType} name must be lowercase with only alphanumeric characters and dashes`
        };
    }
    return { isValid: true };
}
/**
 * Combines multiple validation results
 */
function combineValidationResults(...results) {
    const combinedErrors = [];
    const combinedWarnings = [];
    for (const result of results) {
        combinedErrors.push(...result.errors);
        combinedWarnings.push(...result.warnings);
    }
    return {
        isValid: combinedErrors.length === 0,
        errors: combinedErrors,
        warnings: combinedWarnings
    };
}
/**
 * Creates a validation result from errors and warnings
 */
function createValidationResult(errors = [], warnings = []) {
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
//# sourceMappingURL=ValidationUtils.js.map