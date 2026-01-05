// src/resolver/types.ts
export const uiResolveModes = ["static", "runtime"];
// Error types for better error handling
export class ResolverError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'ResolverError';
    }
}
export class MathEvaluationError extends ResolverError {
    constructor(expression, cause) {
        super(`Failed to evaluate math expression: ${expression}`, cause);
        this.name = 'MathEvaluationError';
    }
}
export class ReferenceResolutionError extends ResolverError {
    constructor(ref, cause) {
        super(`Cannot resolve reference: ${ref}`, cause);
        this.name = 'ReferenceResolutionError';
    }
}
export class ResponsiveResolutionError extends ResolverError {
    constructor(message, cause) {
        super(message, cause);
        this.name = 'ResponsiveResolutionError';
    }
}
export class CircularReferenceError extends ResolverError {
    constructor(path, cause) {
        super(`Circular reference detected: ${path.join(' → ')}`, cause);
        this.name = 'CircularReferenceError';
    }
}
export class ValidationError extends ResolverError {
    constructor(message, cause) {
        super(message, cause);
        this.name = 'ValidationError';
    }
}
//# sourceMappingURL=types.js.map