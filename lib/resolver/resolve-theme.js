// src/resolver/resolve-theme.ts
import { resolveRef } from "./resolve-ref";
import { resolveMath } from "./resolve-math";
import { resolveResponsive } from "./resolve-responsive";
export function resolveTheme(theme, options = {}) {
    const mode = options.mode ?? "static";
    const lookup = (path) => {
        const parts = path.split(".");
        let current = theme.tokens;
        for (const key of parts) {
            if (current == null)
                return undefined;
            current = current[key];
        }
        return current;
    };
    const resolveValue = (value) => {
        if (Array.isArray(value)) {
            return value.map(resolveValue);
        }
        if (typeof value === "object" && value !== null) {
            if ("ref" in value) {
                const resolved = resolveRef(value, lookup);
                const withMath = resolveMath(value, resolved);
                return resolveResponsive(withMath, mode);
            }
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