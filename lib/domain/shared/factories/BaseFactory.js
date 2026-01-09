"use strict";
/**
 * Base Factory Class
 * Implements DRY and SOLID principles for factory patterns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryBuilder = exports.GlobalFactoryRegistry = exports.FactoryMethod = exports.ContractFactory = exports.ComponentFactory = exports.FactoryRegistry = exports.BaseFactory = void 0;
class BaseFactory {
    /**
     * Validates input before creation
     */
    validateInput(_input) {
        // Default implementation - override in subclasses
    }
    /**
     * Creates multiple items from inputs
     */
    createMany(inputs) {
        return inputs.map(input => this.create(input));
    }
    /**
     * Creates an item with validation
     */
    createValidated(input) {
        this.validateInput(input);
        return this.create(input);
    }
}
exports.BaseFactory = BaseFactory;
/**
 * Factory registry for managing multiple factory types
 */
class FactoryRegistry {
    constructor() {
        this.factories = new Map();
    }
    registerFactory(name, factory) {
        this.factories.set(name, factory);
    }
    getFactory(name) {
        return this.factories.get(name);
    }
    createWithFactory(factoryName, input) {
        const factory = this.getFactory(factoryName);
        return factory?.create(input);
    }
    getRegisteredFactories() {
        return Array.from(this.factories.keys());
    }
}
exports.FactoryRegistry = FactoryRegistry;
/**
 * Component factory base class
 */
class ComponentFactory extends BaseFactory {
}
exports.ComponentFactory = ComponentFactory;
/**
 * Contract factory base class
 */
class ContractFactory extends ComponentFactory {
    /**
     * Validates contract-specific business rules
     */
    validateContractRules(_input) {
        // Contract-specific validation logic
    }
    /**
     * Creates a contract with validation
     */
    createValidatedContract(input) {
        this.validateInput(input);
        this.validateContractRules(input);
        return this.create(input);
    }
}
exports.ContractFactory = ContractFactory;
/**
 * Factory method pattern implementation
 */
class FactoryMethod {
    /**
     * Main factory method that orchestrates creation
     */
    create() {
        // Pre-creation logic
        this.beforeCreate();
        // Create the product
        const product = this.createProduct();
        // Post-creation logic
        this.afterCreate(product);
        return product;
    }
    /**
     * Hook for pre-creation logic
     */
    beforeCreate() {
        // Default implementation - override in subclasses
    }
    /**
     * Hook for post-creation logic
     */
    afterCreate(_product) {
        // Default implementation - override in subclasses
    }
}
exports.FactoryMethod = FactoryMethod;
/**
 * Singleton factory registry
 */
class GlobalFactoryRegistry {
    static getInstance() {
        if (!GlobalFactoryRegistry.instance) {
            GlobalFactoryRegistry.instance = new FactoryRegistry();
        }
        return GlobalFactoryRegistry.instance;
    }
}
exports.GlobalFactoryRegistry = GlobalFactoryRegistry;
/**
 * Factory builder pattern for complex factory creation
 */
class FactoryBuilder {
    constructor() {
        this.validators = [];
        this.postProcessors = [];
        this.preProcessors = [];
    }
    addValidator(validator) {
        this.validators.push(validator);
        return this;
    }
    addPreProcessor(processor) {
        this.preProcessors.push(processor);
        return this;
    }
    addPostProcessor(processor) {
        this.postProcessors.push(processor);
        return this;
    }
    build(creator) {
        return {
            create: (input) => {
                // Pre-process input
                let processedInput = input;
                for (const processor of this.preProcessors) {
                    processedInput = processor(processedInput);
                }
                // Validate input
                for (const validator of this.validators) {
                    validator(processedInput);
                }
                // Create output
                let output = creator(processedInput);
                // Post-process output
                for (const processor of this.postProcessors) {
                    output = processor(output);
                }
                return output;
            }
        };
    }
}
exports.FactoryBuilder = FactoryBuilder;
//# sourceMappingURL=BaseFactory.js.map