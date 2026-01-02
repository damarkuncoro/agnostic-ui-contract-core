import type { UiExtendedTokenGroup } from "./types";
export type UiTimingSemantic = "instant" | "fast" | "normal" | "slow";
export declare const uiTimingSemantics: UiTimingSemantic[];
export interface UiTimingTokens extends UiExtendedTokenGroup {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
}
//# sourceMappingURL=timing.d.ts.map