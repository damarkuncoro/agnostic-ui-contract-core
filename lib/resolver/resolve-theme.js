// src/resolver/resolve-theme.ts
import { ValidationError, CircularReferenceError } from "./types";
import { Resolver } from "./resolve-pipeline";
/**
 * Validates theme structure and options
 */
function validateInputs(theme, options) {
    // Validate theme structure
    if (!theme || typeof theme !== 'object') {
        throw new ValidationError('Theme must be a valid object');
    }
    if (!theme.version || typeof theme.version !== 'string') {
        throw new ValidationError('Theme must have a valid version string');
    }
    if (!theme.tokens || typeof theme.tokens !== 'object') {
        throw new ValidationError('Theme must have a tokens object');
    }
    // Validate options
    if (options.mode && !['static', 'runtime'].includes(options.mode)) {
        throw new ValidationError(`Invalid mode: ${options.mode}. Must be 'static' or 'runtime'`);
    }
    if (options.breakpoint && typeof options.breakpoint !== 'string') {
        throw new ValidationError('Breakpoint must be a string');
    }
}
export function resolveTheme(theme, options = {}) {
    // Validate inputs
    validateInputs(theme, options);
    const mode = options.mode ?? "static";
    const breakpoint = options.breakpoint;
    // Create cached lookup with circular reference detection
    const lookupCache = new Map();
    const resolutionPath = [];
    const lookup = (path) => {
        // Check cache first
        if (lookupCache.has(path)) {
            return lookupCache.get(path);
        }
        // Check for circular reference
        if (resolutionPath.includes(path)) {
            throw new CircularReferenceError([...resolutionPath, path]);
        }
        // Resolve the path
        const parts = path.split(".");
        let current = theme.tokens;
        resolutionPath.push(path);
        try {
            for (const key of parts) {
                if (current == null) {
                    lookupCache.set(path, undefined);
                    return undefined;
                }
                current = current[key];
            }
            lookupCache.set(path, current);
            return current;
        }
        finally {
            resolutionPath.pop();
        }
    };
    const resolveValue = (value) => {
        if (Array.isArray(value)) {
            return value.map(resolveValue);
        }
        if (typeof value === "object" && value !== null) {
            // Check if this is a token that needs resolution
            if ("$ref" in value || "$math" in value || "$responsive" in value) {
                return Resolver.resolve(value, mode, lookup, breakpoint);
            }
            // For plain objects, recursively resolve all properties
            const out = {};
            for (const key in value) {
                out[key] = resolveValue(value[key]);
            }
            return out;
        }
        return value;
    };
    return {
        ...theme,
        tokens: resolveValue(theme.tokens)
    };
}
//# sourceMappingURL=resolve-theme.js.map