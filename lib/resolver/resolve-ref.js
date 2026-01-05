"use strict";
// src/resolver/resolve-ref.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRef = resolveRef;
const types_1 = require("./types");
function resolveRef(value, lookup) {
    if (typeof value === "object" &&
        value !== null &&
        "$ref" in value) {
        const ref = value.$ref;
        const resolved = lookup(ref);
        if (resolved === undefined) {
            throw new types_1.ReferenceResolutionError(ref);
        }
        return resolved;
    }
    return value;
}
//# sourceMappingURL=resolve-ref.js.map