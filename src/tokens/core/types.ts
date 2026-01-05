// tokens/core/types.ts

export type UiTokenPrimitive =
  | string
  | number

/**
 * Strongly typed token reference
 */
export type UiTokenRef = {
  $ref: string // Path to token value (e.g., "colors.primary", "spacing.md")
}

/**
 * Math expression token with type-safe evaluation
 */
export type UiTokenMath = {
  $math: string // Math expression that evaluates to number
}

/**
 * Responsive token with breakpoint-aware values
 */
export type UiTokenResponsive = {
  $responsive: Record<string, UiTokenValue>
}

/**
 * Union of all possible token value types
 */
export type UiTokenValue =
  | UiTokenPrimitive
  | UiTokenRef
  | UiTokenMath
  | UiTokenResponsive

/**
 * Type guard to check if a value is a valid token
 */
export function isUiTokenValue(value: unknown): value is UiTokenValue {
  if (value === null || typeof value !== "object") {
    return typeof value === "string" || typeof value === "number"
  }

  const obj = value as Record<string, unknown>

  // Check for single intent markers
  const intentKeys = Object.keys(obj)
  if (intentKeys.length === 1) {
    const key = intentKeys[0]
    if (key === "$ref" && typeof obj[key] === "string") return true
    if (key === "$math" && typeof obj[key] === "string") return true
    if (key === "$responsive" && typeof obj[key] === "object" && obj[key] !== null) return true
  }

  return false
}

/**
 * Type guard for token references
 */
export function isUiTokenRef(value: unknown): value is UiTokenRef {
  return typeof value === "object" && value !== null &&
         "$ref" in value && typeof (value as any).$ref === "string"
}

/**
 * Type guard for math expressions
 */
export function isUiTokenMath(value: unknown): value is UiTokenMath {
  return typeof value === "object" && value !== null &&
         "$math" in value && typeof (value as any).$math === "string"
}

/**
 * Type guard for responsive tokens
 */
export function isUiTokenResponsive(value: unknown): value is UiTokenResponsive {
  return typeof value === "object" && value !== null &&
         "$responsive" in value && typeof (value as any).$responsive === "object"
}

export type UiTokenScale<T = UiTokenValue> =
  Record<string, T>
