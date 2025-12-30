// tokens/extended/loading.ts

import type { UiExtendedTokenGroup } from "./types"

export interface UiLoadingTokens extends UiExtendedTokenGroup {
  spinnerSize: {
    sm: string
    md: string
    lg: string
  }

  overlayOpacity: number
}
