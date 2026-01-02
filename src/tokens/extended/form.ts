// tokens/extended/form.ts

import type { UiExtendedTokenGroup } from "./types"

export type UiFormControlHeight = "sm" | "md" | "lg"

export const uiFormControlHeights: UiFormControlHeight[] = ["sm", "md", "lg"]

export interface UiFormTokens extends UiExtendedTokenGroup {
  fieldSpacing: string
  labelSpacing: string

  controlHeight: {
    sm: string
    md: string
    lg: string
  }
}
