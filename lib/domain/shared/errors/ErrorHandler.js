"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
/**
 * Error Handler utility for consistent error handling across the domain
 */
const DomainError_1 = require("./DomainError");
class ErrorHandler {
    /**
     * Wraps a function with error handling and conversion to domain errors
     */
    static async executeAsync(operation, context) {
        try {
            return await operation();
        }
        catch (error) {
            throw this.convertToDomainError(error, context);
        }
    }
    /**
     * Wraps a synchronous function with error handling
     */
    static executeSync(operation, context) {
        try {
            return operation();
        }
        catch (error) {
            throw this.convertToDomainError(error, context);
        }
    }
    /**
     * Converts various error types to domain errors
     */
    static convertToDomainError(error, context) {
        // If it's already a domain error, return as-is
        if (error instanceof DomainError_1.DomainError) {
            return error;
        }
        // Handle common error types
        if (error instanceof Error) {
            // Handle validation errors
            if (error.message.includes('validation') || error.message.includes('invalid')) {
                return new DomainError_1.ValidationError(error.message, undefined, undefined, context);
            }
            // Handle business rule violations
            if (error.message.includes('business') || error.message.includes('rule')) {
                return new DomainError_1.BusinessRuleViolationError(error.message, undefined, context);
            }
            // Wrap other errors as infrastructure errors
            return new DomainError_1.ValidationError(`Operation failed: ${error.message}`, undefined, undefined, { originalError: error, ...context });
        }
        // Handle unknown errors
        return new DomainError_1.ValidationError('An unknown error occurred', undefined, error, context);
    }
    /**
     * Creates a validation error with field information
     */
    static validationError(message, field, value, context) {
        return new DomainError_1.ValidationError(message, field, value, context);
    }
    /**
     * Creates a business rule violation error
     */
    static businessRuleViolation(rule, details, context) {
        return new DomainError_1.BusinessRuleViolationError(rule, details, context);
    }
    /**
     * Checks if an error is a domain error
     */
    static isDomainError(error) {
        return error instanceof DomainError_1.DomainError;
    }
    /**
     * Gets error code from an error
     */
    static getErrorCode(error) {
        if (this.isDomainError(error)) {
            return error.code;
        }
        return 'UNKNOWN_ERROR';
    }
    /**
     * Formats error for logging
     */
    static formatForLogging(error) {
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
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map