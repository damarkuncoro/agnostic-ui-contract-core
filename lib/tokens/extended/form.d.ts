import type { UiExtendedTokenGroup } from "./types";
export type UiFormControlHeight = "sm" | "md" | "lg";
export declare const uiFormControlHeights: UiFormControlHeight[];
export interface UiFormTokens extends UiExtendedTokenGroup {
    fieldSpacing: string;
    labelSpacing: string;
    controlHeight: {
        sm: string;
        md: string;
        lg: string;
    };
}
//# sourceMappingURL=form.d.ts.map