// src/resolver/resolve-ref.ts
import { ReferenceResolutionError } from "./types";
export function resolveRef(value, lookup) {
    if (typeof value === "object" &&
        value !== null &&
        "$ref" in value) {
        const ref = value.$ref;
        const resolved = lookup(ref);
        if (resolved === undefined) {
            throw new ReferenceResolutionError(ref);
        }
        return resolved;
    }
    return value;
}
//# sourceMappingURL=resolve-ref.js.map