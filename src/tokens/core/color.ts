// tokens/core/color.ts

import type { UiTokenScale } from "./types"

export type UiColorTextSemantic = "primary" | "secondary" | "muted" | "inverse" | "disabled"
export type UiColorBackgroundSemantic = "surface" | "elevated" | "muted" | "inverse"
export type UiColorBorderSemantic = "default" | "subtle" | "strong" | "focus"

export const uiColorTextSemantics: UiColorTextSemantic[] = ["primary", "secondary", "muted", "inverse", "disabled"]
export const uiColorBackgroundSemantics: UiColorBackgroundSemantic[] = ["surface", "elevated", "muted", "inverse"]
export const uiColorBorderSemantics: UiColorBorderSemantic[] = ["default", "subtle", "strong", "focus"]

export interface UiColorTokens {
  /** Base palette (brand / neutral) */
  palette: {
    neutral: UiTokenScale
    primary: UiTokenScale
    secondary?: UiTokenScale
    success?: UiTokenScale
    warning?: UiTokenScale
    danger?: UiTokenScale
  }

  /** Semantic usage */
  text: {
    primary: string
    secondary: string
    muted: string
    inverse: string
    disabled: string
  }

  background: {
    surface: string
    elevated: string
    muted: string
    inverse: string
  }

  border: {
    default: string
    subtle: string
    strong: string
    focus: string
  }
}
