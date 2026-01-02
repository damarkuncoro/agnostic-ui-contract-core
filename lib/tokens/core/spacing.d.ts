import type { UiTokenScale } from "./types";
export type UiSpacingSemantic = "xs" | "sm" | "md" | "lg" | "xl";
export declare const uiSpacingSemantics: UiSpacingSemantic[];
export interface UiSpacingTokens {
    scale: UiTokenScale<number>;
    semantic: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}
//# sourceMappingURL=spacing.d.ts.map