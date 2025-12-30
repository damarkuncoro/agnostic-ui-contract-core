// tokens/core/z-index.ts

import type { UiTokenScale } from "./types"

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
