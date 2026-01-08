/**
 * Base Domain Error class for all domain-specific errors
 * Provides consistent error handling across the domain layer
 */
export abstract class DomainError extends Error {
  public readonly code: string;
  public readonly timestamp: Date;
  public readonly context: Record<string, any> | undefined;

  constructor(
    message: string,
    code: string,
    context?: Record<string, any>
  ) {
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

/**
 * Validation Error for domain validation failures
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: any,
    context?: Record<string, any>
  ) {
    super(message, 'VALIDATION_ERROR', {
      field,
      value,
      ...context
    });
  }
}

/**
 * Not Found Error for missing domain entities
 */
export class NotFoundError extends DomainError {
  constructor(
    resource: string,
    identifier: string | number,
    context?: Record<string, any>
  ) {
    super(
      `${resource} with identifier '${identifier}' not found`,
      'NOT_FOUND_ERROR',
      {
        resource,
        identifier,
        ...context
      }
    );
  }
}

/**
 * Business Rule Violation Error
 */
export class BusinessRuleViolationError extends DomainError {
  constructor(
    rule: string,
    details?: string,
    context?: Record<string, any>
  ) {
    super(
      `Business rule violation: ${rule}${details ? ` - ${details}` : ''}`,
      'BUSINESS_RULE_VIOLATION',
      {
        rule,
        details,
        ...context
      }
    );
  }
}

/**
 * Concurrency Error for optimistic locking conflicts
 */
export class ConcurrencyError extends DomainError {
  constructor(
    resource: string,
    expectedVersion: number,
    actualVersion: number,
    context?: Record<string, any>
  ) {
    super(
      `Concurrency conflict on ${resource}: expected version ${expectedVersion}, got ${actualVersion}`,
      'CONCURRENCY_ERROR',
      {
        resource,
        expectedVersion,
        actualVersion,
        ...context
      }
    );
  }
}

/**
 * Authorization Error for domain-level security violations
 */
export class AuthorizationError extends DomainError {
  constructor(
    action: string,
    resource: string,
    context?: Record<string, any>
  ) {
    super(
      `Unauthorized: Cannot ${action} ${resource}`,
      'AUTHORIZATION_ERROR',
      {
        action,
        resource,
        ...context
      }
    );
  }
}

/**
 * Infrastructure Error for external service failures
 */
export class InfrastructureError extends DomainError {
  constructor(
    service: string,
    operation: string,
    originalError?: Error,
    context?: Record<string, any>
  ) {
    super(
      `Infrastructure error in ${service} during ${operation}: ${originalError?.message || 'Unknown error'}`,
      'INFRASTRUCTURE_ERROR',
      {
        service,
        operation,
        originalError: originalError?.toString(),
        ...context
      }
    );
    this.cause = originalError;
  }

  public readonly cause: Error | undefined;
}

/**
 * Configuration Error for invalid configuration
 */
export class ConfigurationError extends DomainError {
  constructor(
    setting: string,
    expected: string,
    actual?: any,
    context?: Record<string, any>
  ) {
    super(
      `Configuration error: ${setting} should be ${expected}${actual !== undefined ? `, got ${actual}` : ''}`,
      'CONFIGURATION_ERROR',
      {
        setting,
        expected,
        actual,
        ...context
      }
    );
  }
}