"use strict";
// packages/agnostic-ui-contract-core/src/domain/shared/BaseEntity.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
/**
 * Base Entity class providing common entity functionality
 */
class BaseEntity {
    constructor(id) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }
    get id() {
        return this._id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    markAsModified() {
        this._updatedAt = new Date();
    }
    equals(entity) {
        return this._id === entity._id;
    }
}
exports.BaseEntity = BaseEntity;
