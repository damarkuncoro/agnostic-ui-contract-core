// tokens/extended/animation.ts

import type { UiExtendedScale, UiExtendedTokenGroup } from "./types"

export type UiAnimationSemantic = "enter" | "exit" | "emphasize" | "subtle"

export const uiAnimationSemantics: UiAnimationSemantic[] = ["enter", "exit", "emphasize", "subtle"]

export interface UiAnimationTokens extends UiExtendedTokenGroup {
  duration: UiExtendedScale<number>
  easing: UiExtendedScale<string>

  semantic: {
    enter: string
    exit: string
    emphasize: string
    subtle: string
  }
}
