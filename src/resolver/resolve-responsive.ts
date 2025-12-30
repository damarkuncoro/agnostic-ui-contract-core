// src/resolver/resolve-responsive.ts

export function resolveResponsive(
  value: unknown,
  mode: "static" | "runtime"
): unknown {
  if (mode === "static") {
    return value
  }

  // future extension:
  // if (typeof value === "object" && "$responsive" in value)

  return value
}
