// src/resolver/resolve-ref.ts

import type { UiTokenValue } from "../tokens/core"
import { ReferenceResolutionError } from "./types"

export function resolveRef(
  value: UiTokenValue,
  lookup: (ref: string) => unknown
): unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    "$ref" in value
  ) {
    const ref = value.$ref
    const resolved = lookup(ref)

    if (resolved === undefined) {
      throw new ReferenceResolutionError(ref)
    }

    return resolved
  }

  return value
}
