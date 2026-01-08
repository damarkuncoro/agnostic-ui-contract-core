/**
 * Base Domain Error class for all domain-specific errors
 * Provides consistent error handling across the domain layer
 */
export declare abstract class DomainError extends Error {
    readonly code: string;
    readonly timestamp: Date;
    readonly context: Record<string, any> | undefined;
    constructor(message: string, code: string, context?: Record<string, any>);
    /**
     * Converts error to a plain object for serialization
     */
    toJSON(): {
        name: string;
        message: string;
        code: string;
        timestamp: string;
        context: Record<string, any> | undefined;
        stack: string | undefined;
    };
}
/**
 * Validation Error for domain validation failures
 */
export declare class ValidationError extends DomainError {
    readonly field?: string | undefined;
    readonly value?: any | undefined;
    constructor(message: string, field?: string | undefined, value?: any | undefined, context?: Record<string, any>);
}
/**
 * Not Found Error for missing domain entities
 */
export declare class NotFoundError extends DomainError {
    constructor(resource: string, identifier: string | number, context?: Record<string, any>);
}
/**
 * Business Rule Violation Error
 */
export declare class BusinessRuleViolationError extends DomainError {
    constructor(rule: string, details?: string, context?: Record<string, any>);
}
/**
 * Concurrency Error for optimistic locking conflicts
 */
export declare class ConcurrencyError extends DomainError {
    constructor(resource: string, expectedVersion: number, actualVersion: number, context?: Record<string, any>);
}
/**
 * Authorization Error for domain-level security violations
 */
export declare class AuthorizationError extends DomainError {
    constructor(action: string, resource: string, context?: Record<string, any>);
}
/**
 * Infrastructure Error for external service failures
 */
export declare class InfrastructureError extends DomainError {
    constructor(service: string, operation: string, originalError?: Error, context?: Record<string, any>);
    readonly cause: Error | undefined;
}
/**
 * Configuration Error for invalid configuration
 */
export declare class ConfigurationError extends DomainError {
    constructor(setting: string, expected: string, actual?: any, context?: Record<string, any>);
}
//# sourceMappingURL=DomainError.d.ts.map