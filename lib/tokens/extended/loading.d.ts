import type { UiExtendedTokenGroup } from "./types";
export type UiLoadingSpinnerSize = "sm" | "md" | "lg";
export declare const uiLoadingSpinnerSizes: UiLoadingSpinnerSize[];
export interface UiLoadingTokens extends UiExtendedTokenGroup {
    spinnerSize: {
        sm: string;
        md: string;
        lg: string;
    };
    overlayOpacity: number;
}
//# sourceMappingURL=loading.d.ts.map