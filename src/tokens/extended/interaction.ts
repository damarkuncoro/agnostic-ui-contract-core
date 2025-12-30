// tokens/extended/interaction.ts

import type { UiExtendedTokenGroup } from "./types"

export interface UiInteractionTokens extends UiExtendedTokenGroup {
  hitArea: {
    min: number
  }

  focusRing: {
    width: number
    offset: number
  }
}
