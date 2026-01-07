"use strict";
/**
 * Contract Name Value Object
 * Represents a contract name with validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractName = void 0;
class ContractName {
    constructor(_value) {
        this._value = _value;
    }
    static create(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Contract name must be a non-empty string');
        }
        // Validation: lowercase, alphanumeric, dashes only
        const validName = /^[a-z][a-z0-9-]*$/;
        if (!validName.test(value)) {
            throw new Error('Contract name must be lowercase with only alphanumeric characters and dashes');
        }
        return new ContractName(value);
    }
    static fromString(value) {
        return ContractName.create(value);
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
}
exports.ContractName = ContractName;
