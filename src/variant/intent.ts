// src/variant/intent.ts

export type UiVariantIntent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"

export const uiIntents: UiVariantIntent[] = ["primary", "secondary", "success", "warning", "danger", "neutral"]

export interface UiIntentVariant {
  intent?: UiVariantIntent
}
