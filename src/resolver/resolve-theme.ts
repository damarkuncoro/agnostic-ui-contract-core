// src/resolver/resolve-theme.ts

import type { UiTheme } from "../theme"
import type { UiResolveOptions } from "./types"
import { resolveRef } from "./resolve-ref"
import { resolveMath } from "./resolve-math"
import { resolveResponsive } from "./resolve-responsive"

export function resolveTheme(
  theme: UiTheme,
  options: UiResolveOptions = {}
): UiTheme {
  const mode = options.mode ?? "static"

  const lookup = (path: string): unknown => {
    const parts = path.split(".")
    let current: any = theme.tokens

    for (const key of parts) {
      if (current == null) return undefined
      current = current[key]
    }

    return current
  }

  const resolveValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(resolveValue)
    }

    if (typeof value === "object" && value !== null) {
      if ("ref" in value) {
        const resolved = resolveRef(value, lookup)
        const withMath = resolveMath(value, resolved)
        return resolveResponsive(withMath, mode)
      }

      const out: any = {}
      for (const key in value) {
        out[key] = resolveValue(value[key])
      }
      return out
    }

    return value
  }

  return {
    ...theme,
    tokens: resolveValue(theme.tokens)
  }
}
