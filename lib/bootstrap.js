"use strict";
/**
 * Contract-Core Application Bootstrap
 * Sets up dependency injection container for contract operations using DDD principles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractCoreServiceContainer = void 0;
exports.getCreateContractUseCase = getCreateContractUseCase;
exports.getSchemaContractValidator = getSchemaContractValidator;
exports.getContractValidators = getContractValidators;
exports.getContractCoreService = getContractCoreService;
const CreateContractUseCase_1 = require("./application/use-cases/CreateContractUseCase");
const SchemaContractValidator_1 = require("./infrastructure/validators/SchemaContractValidator");
// Service container for dependency injection
class ContractCoreServiceContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    static getInstance() {
        if (!ContractCoreServiceContainer.instance) {
            ContractCoreServiceContainer.instance = new ContractCoreServiceContainer();
        }
        return ContractCoreServiceContainer.instance;
    }
    initializeServices() {
        // Infrastructure - Contract Validators
        const schemaValidator = new SchemaContractValidator_1.SchemaContractValidator();
        this.services.set('SchemaContractValidator', schemaValidator);
        // Contract Validators Array
        const contractValidators = [schemaValidator];
        this.services.set('ContractValidators', contractValidators);
        // Application Services
        this.services.set('CreateContractUseCase', new CreateContractUseCase_1.CreateContractUseCase(contractValidators));
    }
    get(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service not found: ${serviceName}`);
        }
        return service;
    }
    // Convenience methods for commonly used services
    getCreateContractUseCase() {
        return this.get('CreateContractUseCase');
    }
    getSchemaContractValidator() {
        return this.get('SchemaContractValidator');
    }
    getContractValidators() {
        return this.get('ContractValidators');
    }
}
// Export singleton instance
exports.contractCoreServiceContainer = ContractCoreServiceContainer.getInstance();
// Export convenience functions
function getCreateContractUseCase() {
    return exports.contractCoreServiceContainer.getCreateContractUseCase();
}
function getSchemaContractValidator() {
    return exports.contractCoreServiceContainer.getSchemaContractValidator();
}
function getContractValidators() {
    return exports.contractCoreServiceContainer.getContractValidators();
}
// Export service locator function for generic access
function getContractCoreService(serviceName) {
    return exports.contractCoreServiceContainer.get(serviceName);
}
//# sourceMappingURL=bootstrap.js.map