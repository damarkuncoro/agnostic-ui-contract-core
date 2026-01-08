"use strict";
// packages/agnostic-ui-contract-core/src/domain/shared/ValueObject.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
/**
 * Base Value Object class providing immutability and equality
 */
class ValueObject {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    equals(other) {
        if (!other)
            return false;
        if (this.constructor !== other.constructor)
            return false;
        // Deep equality check for primitive values
        return this.deepEquals(this._value, other._value);
    }
    deepEquals(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return a === b;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length)
                return false;
            for (let i = 0; i < a.length; i++) {
                if (!this.deepEquals(a[i], b[i]))
                    return false;
            }
            return true;
        }
        if (typeof a === 'object' && typeof b === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length)
                return false;
            for (const key of keysA) {
                if (!keysB.includes(key))
                    return false;
                if (!this.deepEquals(a[key], b[key]))
                    return false;
            }
            return true;
        }
        return false;
    }
    toString() {
        return JSON.stringify(this._value);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map