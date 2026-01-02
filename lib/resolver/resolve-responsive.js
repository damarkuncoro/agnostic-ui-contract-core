// src/resolver/resolve-responsive.ts
export function resolveResponsive(value, mode) {
    if (mode === "static") {
        return value;
    }
    // future extension:
    // if (typeof value === "object" && "$responsive" in value)
    return value;
}
//# sourceMappingURL=resolve-responsive.js.map