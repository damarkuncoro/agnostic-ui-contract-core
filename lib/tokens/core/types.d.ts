export type UiTokenPrimitive = string | number;
export type UiTokenRef = {
    $ref: string;
};
export type UiTokenMath = {
    $math: string;
};
export type UiTokenResponsive = {
    $responsive: Record<string, UiTokenValue>;
};
export type UiTokenValue = UiTokenPrimitive | UiTokenRef | UiTokenMath | UiTokenResponsive;
export type UiTokenScale<T = UiTokenValue> = Record<string, T>;
//# sourceMappingURL=types.d.ts.map