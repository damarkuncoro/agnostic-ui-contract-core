"use strict";
/**
 * Variant Domain Entity
 * Represents a variant with its type and allowed values
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const BaseEntity_1 = require("../../shared/BaseEntity");
const VariantType_1 = require("../../shared/value-objects/VariantType");
const DomainEvent_1 = require("../../shared/events/DomainEvent");
class Variant extends BaseEntity_1.BaseEntity {
    constructor(id, _type, values) {
        super(id);
        this._type = _type;
        if (!Array.isArray(values) || values.length === 0) {
            throw new Error('Variant must have at least one value');
        }
        // Validate all values are strings and unique
        const uniqueValues = [...new Set(values)];
        if (uniqueValues.length !== values.length) {
            throw new Error('Variant values must be unique');
        }
        this._values = uniqueValues;
    }
    static create(type, values) {
        const variant = new Variant(type.value, type, values);
        // Domain event would be published by application service
        return variant;
    }
    static createSizeVariant(values) {
        return new Variant(VariantType_1.VariantType.SIZE.value, VariantType_1.VariantType.SIZE, values);
    }
    static createIntentVariant(values) {
        return new Variant(VariantType_1.VariantType.INTENT.value, VariantType_1.VariantType.INTENT, values);
    }
    static createToneVariant(values) {
        return new Variant(VariantType_1.VariantType.TONE.value, VariantType_1.VariantType.TONE, values);
    }
    static createEmphasisVariant(values) {
        return new Variant(VariantType_1.VariantType.EMPHASIS.value, VariantType_1.VariantType.EMPHASIS, values);
    }
    // Getters
    get type() {
        return this._type;
    }
    get values() {
        return [...this._values];
    }
    get count() {
        return this._values.length;
    }
    // Business methods
    hasValue(value) {
        return this._values.includes(value);
    }
    addValue(value) {
        if (this._values.includes(value)) {
            throw new Error(`Value '${value}' already exists in variant`);
        }
        this._values.push(value);
        this.markAsModified();
    }
    removeValue(value) {
        const index = this._values.indexOf(value);
        if (index === -1) {
            return false;
        }
        if (this._values.length === 1) {
            throw new Error('Cannot remove the last value from a variant');
        }
        this._values.splice(index, 1);
        this.markAsModified();
        return true;
    }
    equals(other) {
        return this._type.equals(other._type) &&
            this._values.length === other._values.length &&
            this._values.every(value => other._values.includes(value));
    }
    // Serialization
    toPrimitives() {
        return {
            type: this._type.value,
            values: this._values
        };
    }
    toDomainEvent() {
        return new DomainEvent_1.VariantCreatedEvent(this._type.value, this._values);
    }
}
exports.Variant = Variant;
//# sourceMappingURL=Variant.js.map