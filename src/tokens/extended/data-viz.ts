// tokens/extended/data-viz.ts

import type { UiExtendedScale, UiExtendedTokenGroup } from "./types"

export type UiDataVizSemantic = "categorical" | "sequential" | "diverging"

export const uiDataVizSemantics: UiDataVizSemantic[] = ["categorical", "sequential", "diverging"]

export interface UiDataVizTokens extends UiExtendedTokenGroup {
  scale: UiExtendedScale<number>

  categorical: UiExtendedScale<string>
  sequential: UiExtendedScale<string>
  diverging: UiExtendedScale<string>
}
