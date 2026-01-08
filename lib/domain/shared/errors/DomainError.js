"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = exports.InfrastructureError = exports.AuthorizationError = exports.ConcurrencyError = exports.BusinessRuleViolationError = exports.NotFoundError = exports.ValidationError = exports.DomainError = void 0;
/**
 * Base Domain Error class for all domain-specific errors
 * Provides consistent error handling across the domain layer
 */
class DomainError extends Error {
    constructor(message, code, context) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.timestamp = new Date();
        this.context = context;
        // Maintains proper stack trace for where error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    /**
     * Converts error to a plain object for serialization
     */
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            timestamp: this.timestamp.toISOString(),
            context: this.context,
            stack: this.stack
        };
    }
}
exports.DomainError = DomainError;
/**
 * Validation Error for domain validation failures
 */
class ValidationError extends DomainError {
    constructor(message, field, value, context) {
        super(message, 'VALIDATION_ERROR', {
            field,
            value,
            ...context
        });
        this.field = field;
        this.value = value;
    }
}
exports.ValidationError = ValidationError;
/**
 * Not Found Error for missing domain entities
 */
class NotFoundError extends DomainError {
    constructor(resource, identifier, context) {
        super(`${resource} with identifier '${identifier}' not found`, 'NOT_FOUND_ERROR', {
            resource,
            identifier,
            ...context
        });
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Business Rule Violation Error
 */
class BusinessRuleViolationError extends DomainError {
    constructor(rule, details, context) {
        super(`Business rule violation: ${rule}${details ? ` - ${details}` : ''}`, 'BUSINESS_RULE_VIOLATION', {
            rule,
            details,
            ...context
        });
    }
}
exports.BusinessRuleViolationError = BusinessRuleViolationError;
/**
 * Concurrency Error for optimistic locking conflicts
 */
class ConcurrencyError extends DomainError {
    constructor(resource, expectedVersion, actualVersion, context) {
        super(`Concurrency conflict on ${resource}: expected version ${expectedVersion}, got ${actualVersion}`, 'CONCURRENCY_ERROR', {
            resource,
            expectedVersion,
            actualVersion,
            ...context
        });
    }
}
exports.ConcurrencyError = ConcurrencyError;
/**
 * Authorization Error for domain-level security violations
 */
class AuthorizationError extends DomainError {
    constructor(action, resource, context) {
        super(`Unauthorized: Cannot ${action} ${resource}`, 'AUTHORIZATION_ERROR', {
            action,
            resource,
            ...context
        });
    }
}
exports.AuthorizationError = AuthorizationError;
/**
 * Infrastructure Error for external service failures
 */
class InfrastructureError extends DomainError {
    constructor(service, operation, originalError, context) {
        super(`Infrastructure error in ${service} during ${operation}: ${originalError?.message || 'Unknown error'}`, 'INFRASTRUCTURE_ERROR', {
            service,
            operation,
            originalError: originalError?.toString(),
            ...context
        });
        this.cause = originalError;
    }
}
exports.InfrastructureError = InfrastructureError;
/**
 * Configuration Error for invalid configuration
 */
class ConfigurationError extends DomainError {
    constructor(setting, expected, actual, context) {
        super(`Configuration error: ${setting} should be ${expected}${actual !== undefined ? `, got ${actual}` : ''}`, 'CONFIGURATION_ERROR', {
            setting,
            expected,
            actual,
            ...context
        });
    }
}
exports.ConfigurationError = ConfigurationError;
//# sourceMappingURL=DomainError.js.map