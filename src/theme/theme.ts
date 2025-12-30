// theme/theme.ts

import type { UiCoreTokens } from "../tokens/core"
import type { UiExtendedTokens } from "../tokens/extended"

export interface UiTheme {
  /** Theme version */
  version: string
  /** Core design tokens (mandatory) */
  tokens: UiCoreTokens
  /** Extended tokens (optional) */
  extended?: UiExtendedTokens
}
