// tokens/core/radius.ts

import type { UiTokenScale } from "./types"

export type UiRadiusSemantic = "none" | "sm" | "md" | "lg" | "full"

export const uiRadiusSemantics: UiRadiusSemantic[] = ["none", "sm", "md", "lg", "full"]

export interface UiRadiusTokens {
  scale: UiTokenScale<number>

  semantic: {
    none: string
    sm: string
    md: string
    lg: string
    full: string
  }
}
