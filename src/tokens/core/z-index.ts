// tokens/core/z-index.ts

import type { UiTokenScale } from "./types"

export type UiZIndexSemantic = "dropdown" | "sticky" | "modal" | "popover" | "tooltip"

export const uiZIndexSemantics: UiZIndexSemantic[] = ["dropdown", "sticky", "modal", "popover", "tooltip"]

export interface UiZIndexTokens {
  scale: UiTokenScale<number>

  semantic: {
    dropdown: string
    sticky: string
    modal: string
    popover: string
    tooltip: string
  }
}
