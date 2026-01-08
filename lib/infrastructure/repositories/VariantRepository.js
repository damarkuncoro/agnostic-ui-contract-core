"use strict";
/**
 * Variant Repository Infrastructure Service
 * Manages variant persistence and retrieval
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRepositoryFactory = exports.InMemoryVariantRepository = void 0;
class InMemoryVariantRepository {
    constructor() {
        this.variants = new Map();
    }
    async save(variant) {
        this.variants.set(variant.type.value, variant);
    }
    async findByType(type) {
        return this.variants.get(type.value) || null;
    }
    async findAll() {
        return Array.from(this.variants.values());
    }
    async delete(type) {
        return this.variants.delete(type.value);
    }
    async exists(type) {
        return this.variants.has(type.value);
    }
    // Utility method for testing
    clear() {
        this.variants.clear();
    }
}
exports.InMemoryVariantRepository = InMemoryVariantRepository;
// Factory for creating repositories
class VariantRepositoryFactory {
    static createInMemory() {
        return new InMemoryVariantRepository();
    }
}
exports.VariantRepositoryFactory = VariantRepositoryFactory;
//# sourceMappingURL=VariantRepository.js.map