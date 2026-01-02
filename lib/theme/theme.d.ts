import type { UiCoreTokens } from "../tokens/core";
import type { UiExtendedTokens } from "../tokens/extended";
export type UiThemeVersion = "2.1";
export declare const uiThemeVersions: UiThemeVersion[];
export interface UiTheme {
    /** Theme version */
    version: UiThemeVersion;
    /** Core design tokens (mandatory) */
    tokens: UiCoreTokens;
    /** Extended tokens (optional) */
    extended?: UiExtendedTokens;
}
//# sourceMappingURL=theme.d.ts.map