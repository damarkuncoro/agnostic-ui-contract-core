// src/resolver/resolve-ref.ts
export function resolveRef(value, lookup) {
    if (typeof value === "object" &&
        value !== null &&
        "ref" in value) {
        return lookup(value.ref);
    }
    return value;
}
//# sourceMappingURL=resolve-ref.js.map