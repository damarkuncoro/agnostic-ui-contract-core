// tokens/extended/form.ts

import type { UiExtendedTokenGroup } from "./types"

export interface UiFormTokens extends UiExtendedTokenGroup {
  fieldSpacing: string
  labelSpacing: string

  controlHeight: {
    sm: string
    md: string
    lg: string
  }
}
