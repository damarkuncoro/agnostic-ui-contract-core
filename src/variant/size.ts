// src/variant/size.ts

export type UiVariantSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"

export interface UiSizeVariant {
  size?: UiVariantSize
}
