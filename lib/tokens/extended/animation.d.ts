import type { UiExtendedScale, UiExtendedTokenGroup } from "./types";
export type UiAnimationSemantic = "enter" | "exit" | "emphasize" | "subtle";
export declare const uiAnimationSemantics: UiAnimationSemantic[];
export interface UiAnimationTokens extends UiExtendedTokenGroup {
    duration: UiExtendedScale<number>;
    easing: UiExtendedScale<string>;
    semantic: {
        enter: string;
        exit: string;
        emphasize: string;
        subtle: string;
    };
}
//# sourceMappingURL=animation.d.ts.map