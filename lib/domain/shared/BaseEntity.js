"use strict";
// packages/agnostic-ui-contract-core/src/domain/shared/BaseEntity.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const DomainError_1 = require("./errors/DomainError");
/**
 * Base Entity class providing common entity functionality
 * Enhanced with proper error handling and domain event support
 */
class BaseEntity {
    constructor(id) {
        this._version = 1;
        this.domainEvents = [];
        if (!id || typeof id !== 'string' || id.trim().length === 0) {
            throw new DomainError_1.ValidationError('Entity ID must be a non-empty string', 'id', id);
        }
        this._id = id.trim();
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }
    get id() {
        return this._id;
    }
    get createdAt() {
        return new Date(this._createdAt);
    }
    get updatedAt() {
        return new Date(this._updatedAt);
    }
    get version() {
        return this._version;
    }
    markAsModified() {
        this._updatedAt = new Date();
        this._version++;
    }
    equals(entity) {
        if (!entity || !(entity instanceof BaseEntity)) {
            return false;
        }
        return this._id === entity._id;
    }
    /**
     * Gets and clears all domain events
     */
    getDomainEvents() {
        const events = [...this.domainEvents];
        this.domainEvents = [];
        return events;
    }
    /**
     * Adds a domain event
     */
    addDomainEvent(event) {
        this.domainEvents.push(event);
    }
    /**
     * Checks if entity has unsaved changes
     */
    hasUnsavedChanges() {
        return this.domainEvents.length > 0;
    }
    /**
     * Converts entity to plain object for serialization
     */
    toJSON() {
        return {
            id: this._id,
            createdAt: this._createdAt.toISOString(),
            updatedAt: this._updatedAt.toISOString(),
            version: this._version
        };
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map