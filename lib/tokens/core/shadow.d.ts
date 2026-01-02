import type { UiTokenScale } from "./types";
export type UiShadowSemantic = "sm" | "md" | "lg" | "focus";
export declare const uiShadowSemantics: UiShadowSemantic[];
export interface UiShadowTokens {
    scale: UiTokenScale<string>;
    semantic: {
        sm: string;
        md: string;
        lg: string;
        focus: string;
    };
}
//# sourceMappingURL=shadow.d.ts.map