// tokens/core/spacing.ts

import type { UiTokenScale } from "./types"

export type UiSpacingSemantic = "xs" | "sm" | "md" | "lg" | "xl"

export const uiSpacingSemantics: UiSpacingSemantic[] = ["xs", "sm", "md", "lg", "xl"]

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
