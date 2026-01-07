"use strict";
/**
 * Contract-Core Application Bootstrap
 * Sets up dependency injection container for contract operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractCoreContainer = void 0;
exports.getContractCoreService = getContractCoreService;
const VariantFactory_1 = require("./domain/variant/services/VariantFactory");
const CreateVariantUseCase_1 = require("./application/use-cases/CreateVariantUseCase");
const VariantRepository_1 = require("./infrastructure/repositories/VariantRepository");
// Simple container for contract-core dependencies
class ContractCoreContainer {
    constructor() {
        this.services = new Map();
    }
    register(key, factory) {
        this.services.set(key, factory);
    }
    registerSingleton(key, instance) {
        this.services.set(key, () => instance);
    }
    resolve(key) {
        const factory = this.services.get(key);
        if (!factory) {
            throw new Error(`Service ${key} not registered`);
        }
        return factory();
    }
}
// Global contract-core container
exports.contractCoreContainer = new ContractCoreContainer();
// Register domain services
exports.contractCoreContainer.registerSingleton('IVariantFactory', new VariantFactory_1.VariantFactory());
// Register infrastructure services
exports.contractCoreContainer.registerSingleton('IVariantRepository', VariantRepository_1.VariantRepositoryFactory.createInMemory());
// Register application services
exports.contractCoreContainer.register('CreateVariantUseCase', () => {
    const variantFactory = exports.contractCoreContainer.resolve('IVariantFactory');
    return new CreateVariantUseCase_1.CreateVariantUseCaseImpl(variantFactory);
});
// Helper function to get services
function getContractCoreService(key) {
    return exports.contractCoreContainer.resolve(key);
}
