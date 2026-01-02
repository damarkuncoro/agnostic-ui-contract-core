import type { UiTokenScale } from "./types";
export type UiZIndexSemantic = "dropdown" | "sticky" | "modal" | "popover" | "tooltip";
export declare const uiZIndexSemantics: UiZIndexSemantic[];
export interface UiZIndexTokens {
    scale: UiTokenScale<number>;
    semantic: {
        dropdown: string;
        sticky: string;
        modal: string;
        popover: string;
        tooltip: string;
    };
}
//# sourceMappingURL=z-index.d.ts.map