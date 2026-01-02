// tokens/core/typography.ts

import type { UiTokenScale } from "./types"

export type UiTypographySemantic = "body" | "heading" | "caption"

export const uiTypographySemantics: UiTypographySemantic[] = ["body", "heading", "caption"]

export interface UiTypographyTokens {
  fontFamily: {
    base: string
    heading?: string
    mono?: string
  }

  fontSize: UiTokenScale<number>

  fontWeight: UiTokenScale<number>

  lineHeight: UiTokenScale<number>

  letterSpacing: UiTokenScale<number>

  semantic: {
    body: {
      size: string
      weight: string
      lineHeight: string
    }
    heading: {
      size: string
      weight: string
      lineHeight: string
    }
    caption: {
      size: string
      weight: string
      lineHeight: string
    }
  }
}
