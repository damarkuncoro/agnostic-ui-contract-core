"use strict";
/**
 * Variant Type Value Object
 * Represents a variant type (size, intent, tone, etc.) with validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantType = void 0;
class VariantType {
    constructor(_value) {
        this._value = _value;
    }
    static create(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Variant type must be a non-empty string');
        }
        // Validation: lowercase, alphanumeric only
        const validType = /^[a-z][a-z0-9]*$/;
        if (!validType.test(value)) {
            throw new Error('Variant type must be lowercase with only alphanumeric characters');
        }
        return new VariantType(value);
    }
    get value() {
        return this._value;
    }
    equals(other) {
        return this._value === other._value;
    }
    toString() {
        return this._value;
    }
    isSize() {
        return this.equals(VariantType.SIZE);
    }
    isIntent() {
        return this.equals(VariantType.INTENT);
    }
    isTone() {
        return this.equals(VariantType.TONE);
    }
    isEmphasis() {
        return this.equals(VariantType.EMPHASIS);
    }
}
exports.VariantType = VariantType;
VariantType.SIZE = VariantType.create('size');
VariantType.INTENT = VariantType.create('intent');
VariantType.TONE = VariantType.create('tone');
VariantType.EMPHASIS = VariantType.create('emphasis');
//# sourceMappingURL=VariantType.js.map