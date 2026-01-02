import type { UiTokenScale } from "./types";
export type UiRadiusSemantic = "none" | "sm" | "md" | "lg" | "full";
export declare const uiRadiusSemantics: UiRadiusSemantic[];
export interface UiRadiusTokens {
    scale: UiTokenScale<number>;
    semantic: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
}
//# sourceMappingURL=radius.d.ts.map