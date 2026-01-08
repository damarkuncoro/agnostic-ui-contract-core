/**
 * Error Handler utility for consistent error handling across the domain
 */
import { DomainError, ValidationError, BusinessRuleViolationError } from './DomainError';

export class ErrorHandler {
  /**
   * Wraps a function with error handling and conversion to domain errors
   */
  static async executeAsync<T>(
    operation: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw this.convertToDomainError(error, context);
    }
  }

  /**
   * Wraps a synchronous function with error handling
   */
  static executeSync<T>(
    operation: () => T,
    context?: Record<string, any>
  ): T {
    try {
      return operation();
    } catch (error) {
      throw this.convertToDomainError(error, context);
    }
  }

  /**
   * Converts various error types to domain errors
   */
  static convertToDomainError(
    error: unknown,
    context?: Record<string, any>
  ): DomainError {
    // If it's already a domain error, return as-is
    if (error instanceof DomainError) {
      return error;
    }

    // Handle common error types
    if (error instanceof Error) {
      // Handle validation errors
      if (error.message.includes('validation') || error.message.includes('invalid')) {
        return new ValidationError(error.message, undefined, undefined, context);
      }

      // Handle business rule violations
      if (error.message.includes('business') || error.message.includes('rule')) {
        return new BusinessRuleViolationError(error.message, undefined, context);
      }

      // Wrap other errors as infrastructure errors
      return new ValidationError(
        `Operation failed: ${error.message}`,
        undefined,
        undefined,
        { originalError: error, ...context }
      );
    }

    // Handle unknown errors
    return new ValidationError(
      'An unknown error occurred',
      undefined,
      error,
      context
    );
  }

  /**
   * Creates a validation error with field information
   */
  static validationError(
    message: string,
    field?: string,
    value?: any,
    context?: Record<string, any>
  ): ValidationError {
    return new ValidationError(message, field, value, context);
  }

  /**
   * Creates a business rule violation error
   */
  static businessRuleViolation(
    rule: string,
    details?: string,
    context?: Record<string, any>
  ): BusinessRuleViolationError {
    return new BusinessRuleViolationError(rule, details, context);
  }

  /**
   * Checks if an error is a domain error
   */
  static isDomainError(error: unknown): error is DomainError {
    return error instanceof DomainError;
  }

  /**
   * Gets error code from an error
   */
  static getErrorCode(error: unknown): string {
    if (this.isDomainError(error)) {
      return error.code;
    }
    return 'UNKNOWN_ERROR';
  }

  /**
   * Formats error for logging
   */
  static formatForLogging(error: unknown): Record<string, any> {
    if (this.isDomainError(error)) {
      return {
        name: error.name,
        message: error.message,
        code: error.code,
        timestamp: error.timestamp.toISOString(),
        context: error.context,
        stack: error.stack
      };
    }

    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    return {
      message: String(error),
      type: typeof error
    };
  }
}