// src/resolver/resolve-ref.ts

import type { UiTokenValue } from "../tokens/core"

export function resolveRef(
  value: UiTokenValue,
  lookup: (ref: string) => unknown
): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "ref" in value
  ) {
    return lookup(value.ref)
  }

  return value
}
