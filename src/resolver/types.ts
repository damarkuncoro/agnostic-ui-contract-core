// src/resolver/types.ts

export type UiResolveMode = "static" | "runtime"

export const uiResolveModes: UiResolveMode[] = ["static", "runtime"]

export interface UiResolveOptions {
  /** static = build/SSR, runtime = responsive/user-pref */
  mode?: UiResolveMode
  /** Current breakpoint for runtime responsive resolution */
  breakpoint?: string
}

export type UiResolvedTokens<T> = {
  [K in keyof T]: T[K] extends object
    ? UiResolvedTokens<T[K]>
    : T[K]
}

// Error types for better error handling
export class ResolverError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'ResolverError'
  }
}

export class MathEvaluationError extends ResolverError {
  constructor(expression: string, cause?: unknown) {
    super(`Failed to evaluate math expression: ${expression}`, cause)
    this.name = 'MathEvaluationError'
  }
}

export class ReferenceResolutionError extends ResolverError {
  constructor(ref: string, cause?: unknown) {
    super(`Cannot resolve reference: ${ref}`, cause)
    this.name = 'ReferenceResolutionError'
  }
}

export class ResponsiveResolutionError extends ResolverError {
  constructor(message: string, cause?: unknown) {
    super(message, cause)
    this.name = 'ResponsiveResolutionError'
  }
}

export class CircularReferenceError extends ResolverError {
  constructor(path: string[], cause?: unknown) {
    super(`Circular reference detected: ${path.join(' → ')}`, cause)
    this.name = 'CircularReferenceError'
  }
}

export class ValidationError extends ResolverError {
  constructor(message: string, cause?: unknown) {
    super(message, cause)
    this.name = 'ValidationError'
  }
}
