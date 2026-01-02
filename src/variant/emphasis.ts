// src/variant/emphasis.ts

export type UiVariantEmphasis =
  | "low"
  | "medium"
  | "high"

export const uiEmphases: UiVariantEmphasis[] = ["low", "medium", "high"]

export interface UiEmphasisVariant {
  emphasis?: UiVariantEmphasis
}
