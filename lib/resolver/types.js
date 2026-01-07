"use strict";
// src/resolver/types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.CircularReferenceError = exports.ResponsiveResolutionError = exports.ReferenceResolutionError = exports.MathEvaluationError = exports.ResolverError = exports.uiResolveModes = void 0;
exports.uiResolveModes = ["static", "runtime"];
// Error types for better error handling
class ResolverError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'ResolverError';
    }
}
exports.ResolverError = ResolverError;
class MathEvaluationError extends ResolverError {
    constructor(expression, cause) {
        super(`Failed to evaluate math expression: ${expression}`, cause);
        this.name = 'MathEvaluationError';
    }
}
exports.MathEvaluationError = MathEvaluationError;
class ReferenceResolutionError extends ResolverError {
    constructor(ref, cause) {
        super(`Cannot resolve reference: ${ref}`, cause);
        this.name = 'ReferenceResolutionError';
    }
}
exports.ReferenceResolutionError = ReferenceResolutionError;
class ResponsiveResolutionError extends ResolverError {
    constructor(message, cause) {
        super(message, cause);
        this.name = 'ResponsiveResolutionError';
    }
}
exports.ResponsiveResolutionError = ResponsiveResolutionError;
class CircularReferenceError extends ResolverError {
    constructor(path, cause) {
        super(`Circular reference detected: ${path.join(' → ')}`, cause);
        this.name = 'CircularReferenceError';
    }
}
exports.CircularReferenceError = CircularReferenceError;
class ValidationError extends ResolverError {
    constructor(message, cause) {
        super(message, cause);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
