// src/resolver/resolve-math.ts

import type { UiTokenValue } from "../tokens/core"

export function resolveMath(
  value: UiTokenValue,
  resolved: unknown
): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "ref" in value
  ) {
    let result = resolved as number

    if ("multiply" in value && typeof value.multiply === "number") {
      result *= value.multiply
    }

    if ("add" in value && typeof value.add === "number") {
      result += value.add
    }

    return result
  }

  return resolved
}
