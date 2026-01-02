// theme/theme.ts

import type { UiCoreTokens } from "../tokens/core"
import type { UiExtendedTokens } from "../tokens/extended"

export type UiThemeVersion = "2.1"

export const uiThemeVersions: UiThemeVersion[] = ["2.1"]

export interface UiTheme {
  /** Theme version */
  version: UiThemeVersion
  /** Core design tokens (mandatory) */
  tokens: UiCoreTokens
  /** Extended tokens (optional) */
  extended?: UiExtendedTokens
}
