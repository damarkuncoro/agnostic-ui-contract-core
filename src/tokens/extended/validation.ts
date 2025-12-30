// tokens/extended/validation.ts
import type { UiExtendedTokenGroup } from "./types"

export interface UiValidationTokens extends UiExtendedTokenGroup {
  successColor: string
  warningColor: string
  errorColor: string

  messageSpacing: string
}
