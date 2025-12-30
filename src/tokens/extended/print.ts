// tokens/extended/print.ts

import type { UiExtendedTokenGroup } from "./types"

export interface UiPrintTokens extends UiExtendedTokenGroup {
  gutter: string
  pageMargin: string
  fontScale: number
  grayscale: boolean
}
