// tokens/core/shadow.ts

import type { UiTokenScale } from "./types"

export type UiShadowSemantic = "sm" | "md" | "lg" | "focus"

export const uiShadowSemantics: UiShadowSemantic[] = ["sm", "md", "lg", "focus"]

export interface UiShadowTokens {
  scale: UiTokenScale<string>

  semantic: {
    sm: string
    md: string
    lg: string
    focus: string
  }
}
