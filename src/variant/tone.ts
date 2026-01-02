// src/variant/tone.ts

export type UiVariantTone =
  | "solid"
  | "soft"
  | "outline"
  | "ghost"
  | "link"

export const uiTones: UiVariantTone[] = ["solid", "soft", "outline", "ghost", "link"]

export interface UiToneVariant {
  tone?: UiVariantTone
}
