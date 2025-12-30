// src/theme/validate.ts

import type { UiTheme } from "./theme"

export function validateTheme(theme: UiTheme): void {
  if (theme.version !== "2.1") {
    throw new Error(
      `[agnostic-ui] Unsupported theme version: ${theme.version}`
    )
  }

  if (!theme.tokens?.color) {
    throw new Error("[agnostic-ui] Theme missing core color tokens")
  }

  if (!theme.tokens?.spacing) {
    throw new Error("[agnostic-ui] Theme missing core spacing tokens")
  }

  // Tambahkan validasi ringan saja
}
