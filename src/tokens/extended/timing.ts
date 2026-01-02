// tokens/extended/timing.ts

import type { UiExtendedScale, UiExtendedTokenGroup } from "./types"

export type UiTimingSemantic = "instant" | "fast" | "normal" | "slow"

export const uiTimingSemantics: UiTimingSemantic[] = ["instant", "fast", "normal", "slow"]

export interface UiTimingTokens extends UiExtendedTokenGroup {
  instant: number
  fast: number
  normal: number
  slow: number
}
