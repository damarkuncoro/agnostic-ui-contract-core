/**
 * Error Handler utility for consistent error handling across the domain
 */
import { DomainError, ValidationError, BusinessRuleViolationError } from './DomainError';
export declare class ErrorHandler {
    /**
     * Wraps a function with error handling and conversion to domain errors
     */
    static executeAsync<T>(operation: () => Promise<T>, context?: Record<string, any>): Promise<T>;
    /**
     * Wraps a synchronous function with error handling
     */
    static executeSync<T>(operation: () => T, context?: Record<string, any>): T;
    /**
     * Converts various error types to domain errors
     */
    static convertToDomainError(error: unknown, context?: Record<string, any>): DomainError;
    /**
     * Creates a validation error with field information
     */
    static validationError(message: string, field?: string, value?: any, context?: Record<string, any>): ValidationError;
    /**
     * Creates a business rule violation error
     */
    static businessRuleViolation(rule: string, details?: string, context?: Record<string, any>): BusinessRuleViolationError;
    /**
     * Checks if an error is a domain error
     */
    static isDomainError(error: unknown): error is DomainError;
    /**
     * Gets error code from an error
     */
    static getErrorCode(error: unknown): string;
    /**
     * Formats error for logging
     */
    static formatForLogging(error: unknown): Record<string, any>;
}
//# sourceMappingURL=ErrorHandler.d.ts.map