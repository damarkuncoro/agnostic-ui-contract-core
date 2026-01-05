// src/resolver/resolve-theme.ts

import type { UiTheme } from "../theme"
import type { UiResolveOptions } from "./types"
import { ValidationError, CircularReferenceError } from "./types"
import { Resolver, ResolverPipeline } from "./resolve-pipeline"

/**
 * Validates theme structure and options
 */
function validateInputs(theme: UiTheme, options: UiResolveOptions): void {
  // Validate theme structure
  if (!theme || typeof theme !== 'object') {
    throw new ValidationError('Theme must be a valid object')
  }

  if (!theme.version || typeof theme.version !== 'string') {
    throw new ValidationError('Theme must have a valid version string')
  }

  if (!theme.tokens || typeof theme.tokens !== 'object') {
    throw new ValidationError('Theme must have a tokens object')
  }

  // Validate options
  if (options.mode && !['static', 'runtime'].includes(options.mode)) {
    throw new ValidationError(`Invalid mode: ${options.mode}. Must be 'static' or 'runtime'`)
  }

  if (options.breakpoint && typeof options.breakpoint !== 'string') {
    throw new ValidationError('Breakpoint must be a string')
  }
}

// WeakMap for theme caching to avoid memory leaks
const themeCache = new WeakMap<UiTheme, Map<string, UiTheme>>()

/**
 * Optimized theme resolver with lazy evaluation and memoization
 */
class OptimizedThemeResolver {
  private getCacheKey(options: UiResolveOptions): string {
    return JSON.stringify({
      mode: options.mode ?? "static",
      breakpoint: options.breakpoint
    })
  }

  resolve(theme: UiTheme, options: UiResolveOptions = {}): UiTheme {
    // Get or create theme-specific cache
    let themeSpecificCache = themeCache.get(theme)
    if (!themeSpecificCache) {
      themeSpecificCache = new Map<string, UiTheme>()
      themeCache.set(theme, themeSpecificCache)
    }

    // Check cache first
    const cacheKey = this.getCacheKey(options)
    const cached = themeSpecificCache.get(cacheKey)
    if (cached) {
      return cached
    }

    // Resolve theme
    const resolved = this.doResolve(theme, options)

    // Cache result
    themeSpecificCache.set(cacheKey, resolved)

    return resolved
  }

  private doResolve(theme: UiTheme, options: UiResolveOptions): UiTheme {
    // Validate inputs
    validateInputs(theme, options)

    const mode = options.mode ?? "static"
    const breakpoint = options.breakpoint

    // Create cached lookup with circular reference detection
    const lookupCache = new Map<string, unknown>()
    const resolutionPath: string[] = []

    const lookup = (path: string): unknown => {
      // Check cache first
      if (lookupCache.has(path)) {
        return lookupCache.get(path)
      }

      // Check for circular reference
      if (resolutionPath.includes(path)) {
        throw new CircularReferenceError([...resolutionPath, path])
      }

      // Resolve the path
      const parts = path.split(".")
      let current: any = theme.tokens

      resolutionPath.push(path)
      try {
        for (const key of parts) {
          if (current == null) {
            lookupCache.set(path, undefined)
            return undefined
          }
          current = current[key]
        }

        lookupCache.set(path, current)
        return current
      } finally {
        resolutionPath.pop()
      }
    }

    const resolveValue = (value: any): any => {
      if (Array.isArray(value)) {
        return value.map(resolveValue)
      }

      if (typeof value === "object" && value !== null) {
        // Check if this is a token that needs resolution
        if ("$ref" in value || "$math" in value || "$responsive" in value) {
          return Resolver.resolve(value, mode, lookup, breakpoint)
        }

        // For plain objects, recursively resolve all properties
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
}

// Singleton instance for consistent caching
const themeResolver = new OptimizedThemeResolver()

export function resolveTheme(
  theme: UiTheme,
  options: UiResolveOptions = {}
): UiTheme {
  return themeResolver.resolve(theme, options)
}
