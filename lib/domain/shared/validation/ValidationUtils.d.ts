/**
 * Shared validation utilities for contracts
 * Implements DRY principle by centralizing common validation logic
 */
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
/**
 * Validates if a value is in an allowed set
 */
export declare function validateInSet<T>(value: T | undefined, allowedValues: T[], fieldName: string): {
    isValid: boolean;
    error?: string;
};
/**
 * Validates accessibility features
 */
export declare function validateAccessibility(accessibility: any): ValidationResult;
/**
 * Validates keyboard support
 */
export declare function validateKeyboardSupport(keyboardSupport: any): ValidationResult;
/**
 * Validates variant values (size, intent, tone, etc.)
 */
export declare function validateVariant(value: string | undefined, allowedValues: readonly string[], variantType: string): {
    isValid: boolean;
    error?: string;
};
/**
 * Common variant validation sets
 */
export declare const COMMON_VARIANTS: {
    readonly sizes: readonly ["xs", "sm", "md", "lg", "xl"];
    readonly intents: readonly ["primary", "secondary", "success", "warning", "error", "info", "neutral"];
    readonly tones: readonly ["solid", "outline", "subtle", "ghost", "link"];
    readonly emphases: readonly ["low", "medium", "high"];
    readonly radii: readonly ["none", "sm", "md", "lg", "full"];
    readonly shadows: readonly ["sm", "md", "lg", "xl", "focus"];
    readonly elevations: readonly ["low", "medium", "high"];
};
/**
 * Validates business rules for entity names
 */
export declare function validateEntityName(name: string, entityType: string): {
    isValid: boolean;
    error?: string;
};
/**
 * Combines multiple validation results
 */
export declare function combineValidationResults(...results: ValidationResult[]): ValidationResult;
/**
 * Creates a validation result from errors and warnings
 */
export declare function createValidationResult(errors?: string[], warnings?: string[]): ValidationResult;
//# sourceMappingURL=ValidationUtils.d.ts.map