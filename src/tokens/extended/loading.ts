// tokens/extended/loading.ts

import type { UiExtendedTokenGroup } from "./types"

export type UiLoadingSpinnerSize = "sm" | "md" | "lg"

export const uiLoadingSpinnerSizes: UiLoadingSpinnerSize[] = ["sm", "md", "lg"]

export interface UiLoadingTokens extends UiExtendedTokenGroup {
  spinnerSize: {
    sm: string
    md: string
    lg: string
  }

  overlayOpacity: number
}
