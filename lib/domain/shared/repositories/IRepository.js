"use strict";
/**
 * Generic Repository Interface
 * Follows SOLID principles: Interface Segregation, Dependency Inversion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepository = exports.BaseRepository = void 0;
/**
 * Base repository implementation with common functionality
 */
class BaseRepository {
    constructor() {
        this.entities = new Map();
    }
    async findById(id) {
        return this.entities.get(id) || null;
    }
    async findAll() {
        return Array.from(this.entities.values());
    }
    async save(entity) {
        this.entities.set(entity.id, entity);
    }
    async delete(id) {
        this.entities.delete(id);
    }
    async exists(id) {
        return this.entities.has(id);
    }
}
exports.BaseRepository = BaseRepository;
/**
 * In-memory repository implementation for testing
 */
class InMemoryRepository extends BaseRepository {
    async findBySpecification(spec) {
        const all = await this.findAll();
        return all.filter(entity => spec.isSatisfiedBy(entity));
    }
    async countBySpecification(spec) {
        const results = await this.findBySpecification(spec);
        return results.length;
    }
}
exports.InMemoryRepository = InMemoryRepository;
//# sourceMappingURL=IRepository.js.map