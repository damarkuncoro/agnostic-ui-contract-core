// tokens/extended/timing.ts

import type { UiExtendedScale, UiExtendedTokenGroup } from "./types"

export interface UiTimingTokens extends UiExtendedTokenGroup {
  instant: number
  fast: number
  normal: number
  slow: number
}
