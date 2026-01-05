export type UiTokenPrimitive = string | number;
/**
 * Strongly typed token reference
 */
export type UiTokenRef = {
    $ref: string;
};
/**
 * Math expression token with type-safe evaluation
 */
export type UiTokenMath = {
    $math: string;
};
/**
 * Responsive token with breakpoint-aware values
 */
export type UiTokenResponsive = {
    $responsive: Record<string, UiTokenValue>;
};
/**
 * Union of all possible token value types
 */
export type UiTokenValue = UiTokenPrimitive | UiTokenRef | UiTokenMath | UiTokenResponsive;
/**
 * Type guard to check if a value is a valid token
 */
export declare function isUiTokenValue(value: unknown): value is UiTokenValue;
/**
 * Type guard for token references
 */
export declare function isUiTokenRef(value: unknown): value is UiTokenRef;
/**
 * Type guard for math expressions
 */
export declare function isUiTokenMath(value: unknown): value is UiTokenMath;
/**
 * Type guard for responsive tokens
 */
export declare function isUiTokenResponsive(value: unknown): value is UiTokenResponsive;
export type UiTokenScale<T = UiTokenValue> = Record<string, T>;
//# sourceMappingURL=types.d.ts.map