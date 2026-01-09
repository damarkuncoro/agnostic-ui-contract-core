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
export function validateInSet<T>(
  value: T | undefined,
  allowedValues: T[],
  fieldName: string
): { isValid: boolean; error?: string } {
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
export function validateAccessibility(accessibility: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

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
export function validateKeyboardSupport(keyboardSupport: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

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
export function validateVariant(
  value: string | undefined,
  allowedValues: readonly string[],
  variantType: string
): { isValid: boolean; error?: string } {
  return validateInSet(value, allowedValues as string[], `${variantType} variant`);
}

/**
 * Common variant validation sets
 */
export const COMMON_VARIANTS = {
  sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
  intents: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
  tones: ['solid', 'outline', 'subtle', 'ghost', 'link'],
  emphases: ['low', 'medium', 'high'],
  radii: ['none', 'sm', 'md', 'lg', 'full'],
  shadows: ['sm', 'md', 'lg', 'xl', 'focus'],
  elevations: ['low', 'medium', 'high']
} as const;

/**
 * Validates business rules for entity names
 */
export function validateEntityName(name: string, entityType: string): { isValid: boolean; error?: string } {
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
export function combineValidationResults(...results: ValidationResult[]): ValidationResult {
  const combinedErrors: string[] = [];
  const combinedWarnings: string[] = [];

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
export function createValidationResult(
  errors: string[] = [],
  warnings: string[] = []
): ValidationResult {
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}