// tokens/core/spacing.ts

import type { UiTokenScale } from "./types"

export interface UiSpacingTokens {
  scale: UiTokenScale<number>

  semantic: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}
