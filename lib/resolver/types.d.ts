export type UiResolveMode = "static" | "runtime";
export declare const uiResolveModes: UiResolveMode[];
export interface UiResolveOptions {
    /** static = build/SSR, runtime = responsive/user-pref */
    mode?: UiResolveMode;
    /** Current breakpoint for runtime responsive resolution */
    breakpoint?: string;
}
export type UiResolvedTokens<T> = {
    [K in keyof T]: T[K] extends object ? UiResolvedTokens<T[K]> : T[K];
};
export declare class ResolverError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
export declare class MathEvaluationError extends ResolverError {
    constructor(expression: string, cause?: unknown);
}
export declare class ReferenceResolutionError extends ResolverError {
    constructor(ref: string, cause?: unknown);
}
export declare class ResponsiveResolutionError extends ResolverError {
    constructor(message: string, cause?: unknown);
}
export declare class CircularReferenceError extends ResolverError {
    constructor(path: string[], cause?: unknown);
}
export declare class ValidationError extends ResolverError {
    constructor(message: string, cause?: unknown);
}
//# sourceMappingURL=types.d.ts.map