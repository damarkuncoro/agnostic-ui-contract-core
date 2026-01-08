"use strict";
// =================================================================
// AGNOSTIC UI CONTRACT CORE - STRATEGIC FOUNDATION
// =================================================================
// 🚀 STRATEGIC POSITION: This is NOT just another UI framework package.
//
// This package serves as the architectural cornerstone of the entire Agnostic UI
// ecosystem, implementing Domain-Driven Design principles at scale. It establishes
// the contract between business domains and UI implementation, enabling:
//
// • Framework Agnosticism: UI components can be built with any framework
// • Domain Integrity: Business rules are preserved across all implementations
// • Scalable Architecture: Clean separation of concerns for enterprise-scale UI
// • Type Safety: Compile-time guarantees across the entire component ecosystem
//
// Every component contract in the system extends from this foundation, ensuring
// consistency, maintainability, and architectural integrity across all UI layers.
// =================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiA11yKeyboardActions = exports.uiA11yRoles = exports.uiEmphases = exports.uiTones = exports.uiIntents = exports.uiSizes = exports.getContractCoreService = exports.getContractValidators = exports.getSchemaContractValidator = exports.getCreateContractUseCase = exports.CacheKeyGenerator = exports.Cached = exports.LRUCache = exports.InMemoryCache = exports.ErrorHandler = exports.ConfigurationError = exports.InfrastructureError = exports.AuthorizationError = exports.ConcurrencyError = exports.BusinessRuleViolationError = exports.NotFoundError = exports.ValidationError = exports.DomainError = exports.domainEventPublisher = exports.CompositeDomainEventHandler = exports.BaseDomainEventHandler = exports.InMemoryDomainEventPublisher = exports.VariantFactory = exports.VariantRepositoryFactory = exports.InMemoryVariantRepository = exports.SchemaContractValidator = exports.CreateVariantUseCase = exports.CreateContractUseCase = exports.ValueObject = exports.BaseEntity = exports.VariantType = exports.Variant = exports.ContractName = exports.ContractCategory = exports.ContractStatus = exports.Contract = void 0;
exports.createContractDDD = createContractDDD;
exports.validateContractDDD = validateContractDDD;
exports.createStandardComponentContract = createStandardComponentContract;
exports.convertContractToLegacy = convertContractToLegacy;
exports.isValidContractConfiguration = isValidContractConfiguration;
exports.getStandardVariants = getStandardVariants;
// Initialize bootstrap
require("./bootstrap");
// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================
// Domain Layer - Why It Matters:
// The domain layer contains the core business logic and rules. Entities represent
// business concepts with identity and behavior, while Value Objects represent
// immutable descriptive aspects. This separation ensures business rules are
// preserved and testable independently of infrastructure concerns.
var Contract_1 = require("./domain/contract/entities/Contract");
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return Contract_1.Contract; } });
Object.defineProperty(exports, "ContractStatus", { enumerable: true, get: function () { return Contract_1.ContractStatus; } });
Object.defineProperty(exports, "ContractCategory", { enumerable: true, get: function () { return Contract_1.ContractCategory; } });
var ContractName_1 = require("./domain/shared/value-objects/ContractName");
Object.defineProperty(exports, "ContractName", { enumerable: true, get: function () { return ContractName_1.ContractName; } });
var Variant_1 = require("./domain/variant/entities/Variant");
Object.defineProperty(exports, "Variant", { enumerable: true, get: function () { return Variant_1.Variant; } });
var VariantType_1 = require("./domain/shared/value-objects/VariantType");
Object.defineProperty(exports, "VariantType", { enumerable: true, get: function () { return VariantType_1.VariantType; } });
var BaseEntity_1 = require("./domain/shared/BaseEntity");
Object.defineProperty(exports, "BaseEntity", { enumerable: true, get: function () { return BaseEntity_1.BaseEntity; } });
var ValueObject_1 = require("./domain/shared/ValueObject");
Object.defineProperty(exports, "ValueObject", { enumerable: true, get: function () { return ValueObject_1.ValueObject; } });
// Application Layer - Why It Matters:
// Use Cases orchestrate complex business operations and coordinate between
// domain objects. They encapsulate application-specific logic while keeping
// the domain layer pure and focused on business rules.
var CreateContractUseCase_1 = require("./application/use-cases/CreateContractUseCase");
Object.defineProperty(exports, "CreateContractUseCase", { enumerable: true, get: function () { return CreateContractUseCase_1.CreateContractUseCase; } });
var CreateVariantUseCase_1 = require("./application/use-cases/CreateVariantUseCase");
Object.defineProperty(exports, "CreateVariantUseCase", { enumerable: true, get: function () { return CreateVariantUseCase_1.CreateVariantUseCaseImpl; } });
// Infrastructure Layer - Why It Matters:
// Infrastructure concerns (persistence, external services, frameworks) are
// isolated here through interfaces and adapters. This allows the domain and
// application layers to remain independent and testable.
var SchemaContractValidator_1 = require("./infrastructure/validators/SchemaContractValidator");
Object.defineProperty(exports, "SchemaContractValidator", { enumerable: true, get: function () { return SchemaContractValidator_1.SchemaContractValidator; } });
var VariantRepository_1 = require("./infrastructure/repositories/VariantRepository");
Object.defineProperty(exports, "InMemoryVariantRepository", { enumerable: true, get: function () { return VariantRepository_1.InMemoryVariantRepository; } });
Object.defineProperty(exports, "VariantRepositoryFactory", { enumerable: true, get: function () { return VariantRepository_1.VariantRepositoryFactory; } });
// Domain Services - Why It Matters:
// Domain Services contain business logic that doesn't naturally belong to
// entities or value objects. They orchestrate complex operations across
// multiple domain objects while keeping business rules centralized.
var VariantFactory_1 = require("./domain/variant/services/VariantFactory");
Object.defineProperty(exports, "VariantFactory", { enumerable: true, get: function () { return VariantFactory_1.VariantFactory; } });
var DomainEventPublisher_1 = require("./domain/shared/events/DomainEventPublisher");
Object.defineProperty(exports, "InMemoryDomainEventPublisher", { enumerable: true, get: function () { return DomainEventPublisher_1.InMemoryDomainEventPublisher; } });
Object.defineProperty(exports, "BaseDomainEventHandler", { enumerable: true, get: function () { return DomainEventPublisher_1.BaseDomainEventHandler; } });
Object.defineProperty(exports, "CompositeDomainEventHandler", { enumerable: true, get: function () { return DomainEventPublisher_1.CompositeDomainEventHandler; } });
Object.defineProperty(exports, "domainEventPublisher", { enumerable: true, get: function () { return DomainEventPublisher_1.domainEventPublisher; } });
// Error Handling System - Why It Matters:
// Comprehensive error handling with domain-specific exceptions. Ensures consistent
// error reporting, proper error classification, and maintainable error handling
// throughout the application. Supports both programmatic and logging use cases.
var DomainError_1 = require("./domain/shared/errors/DomainError");
Object.defineProperty(exports, "DomainError", { enumerable: true, get: function () { return DomainError_1.DomainError; } });
Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return DomainError_1.ValidationError; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return DomainError_1.NotFoundError; } });
Object.defineProperty(exports, "BusinessRuleViolationError", { enumerable: true, get: function () { return DomainError_1.BusinessRuleViolationError; } });
Object.defineProperty(exports, "ConcurrencyError", { enumerable: true, get: function () { return DomainError_1.ConcurrencyError; } });
Object.defineProperty(exports, "AuthorizationError", { enumerable: true, get: function () { return DomainError_1.AuthorizationError; } });
Object.defineProperty(exports, "InfrastructureError", { enumerable: true, get: function () { return DomainError_1.InfrastructureError; } });
Object.defineProperty(exports, "ConfigurationError", { enumerable: true, get: function () { return DomainError_1.ConfigurationError; } });
var ErrorHandler_1 = require("./domain/shared/errors/ErrorHandler");
Object.defineProperty(exports, "ErrorHandler", { enumerable: true, get: function () { return ErrorHandler_1.ErrorHandler; } });
var Cache_1 = require("./infrastructure/cache/Cache");
Object.defineProperty(exports, "InMemoryCache", { enumerable: true, get: function () { return Cache_1.InMemoryCache; } });
Object.defineProperty(exports, "LRUCache", { enumerable: true, get: function () { return Cache_1.LRUCache; } });
Object.defineProperty(exports, "Cached", { enumerable: true, get: function () { return Cache_1.Cached; } });
Object.defineProperty(exports, "CacheKeyGenerator", { enumerable: true, get: function () { return Cache_1.CacheKeyGenerator; } });
// Dependency Injection - Why It Matters:
// Provides centralized service management with clear scope and lifetime.
// Singleton pattern ensures consistent service instances across the application
// while maintaining testability through interface-based design. Services are
// initialized once and reused, reducing overhead and ensuring predictable behavior.
var bootstrap_1 = require("./bootstrap");
Object.defineProperty(exports, "getCreateContractUseCase", { enumerable: true, get: function () { return bootstrap_1.getCreateContractUseCase; } });
Object.defineProperty(exports, "getSchemaContractValidator", { enumerable: true, get: function () { return bootstrap_1.getSchemaContractValidator; } });
Object.defineProperty(exports, "getContractValidators", { enumerable: true, get: function () { return bootstrap_1.getContractValidators; } });
Object.defineProperty(exports, "getContractCoreService", { enumerable: true, get: function () { return bootstrap_1.getContractCoreService; } });
// Legacy constants (DEPRECATED - use domain services instead)
exports.uiSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
exports.uiIntents = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'neutral'
];
exports.uiTones = ['subtle', 'normal', 'strong'];
exports.uiEmphases = ['low', 'medium', 'high'];
exports.uiA11yRoles = [
    'button',
    'checkbox',
    'dialog',
    'grid',
    'gridcell',
    'link',
    'list',
    'listitem',
    'menu',
    'menuitem',
    'option',
    'progressbar',
    'radio',
    'radiogroup',
    'region',
    'tab',
    'tablist',
    'tabpanel',
    'textbox',
    'tooltip',
    'tree',
    'treeitem'
];
exports.uiA11yKeyboardActions = [
    'Enter',
    'Space',
    'Escape',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'Tab',
    'Shift+Tab'
];
// =================================================================
// MIGRATION HELPERS - REQUIRED FOR LEGACY CODE
// =================================================================
// Use these functions to migrate from legacy to DDD. Replace legacy usage ASAP.
const Contract_2 = require("./domain/contract/entities/Contract");
const bootstrap_2 = require("./bootstrap");
/**
 * Migrates legacy contract creation to DDD Contract entity
 * @param legacyConfig Legacy contract configuration
 * @returns DDD Contract entity
 */
function createContractDDD(legacyConfig) {
    // Map legacy category to new enum
    const categoryMap = {
        'core': Contract_2.ContractCategory.CORE,
        'component': Contract_2.ContractCategory.COMPONENT,
        'theme': Contract_2.ContractCategory.THEME,
        'skin': Contract_2.ContractCategory.SKIN,
        'utility': Contract_2.ContractCategory.UTILITY
    };
    const category = categoryMap[legacyConfig.category || 'component'] || Contract_2.ContractCategory.COMPONENT;
    return Contract_2.Contract.create({
        name: legacyConfig.name,
        category,
        ...(legacyConfig.version && { version: legacyConfig.version }),
        ...(legacyConfig.description && { description: legacyConfig.description }),
        ...(legacyConfig.variants && { variants: legacyConfig.variants }),
        ...(legacyConfig.props && { props: legacyConfig.props }),
        ...(legacyConfig.accessibility && { accessibility: legacyConfig.accessibility }),
        ...(legacyConfig.validation && { validation: legacyConfig.validation }),
        ...(legacyConfig.metadata && { metadata: legacyConfig.metadata })
    });
}
/**
 * Migrates legacy contract validation to DDD use case
 * @param legacyConfig Legacy contract configuration
 * @returns Promise resolving to validation result
 */
async function validateContractDDD(legacyConfig) {
    const contract = createContractDDD(legacyConfig);
    const validation = contract.validate();
    return {
        isValid: validation.isValid,
        errors: validation.errors,
        warnings: validation.warnings,
        contract
    };
}
/**
 * Creates a standard component contract using DDD
 * @param name Contract name
 * @param options Additional options
 * @returns CreateContractInput for standard component
 */
function createStandardComponentContract(name, options = {}) {
    const useCase = (0, bootstrap_2.getCreateContractUseCase)();
    return useCase.createStandardComponentContract(name, options);
}
/**
 * Converts DDD Contract entity back to legacy format
 * @param contract DDD Contract entity
 * @returns Legacy contract format
 */
function convertContractToLegacy(contract) {
    // Map new category enum to legacy string
    const categoryMap = {
        [Contract_2.ContractCategory.CORE]: 'core',
        [Contract_2.ContractCategory.COMPONENT]: 'component',
        [Contract_2.ContractCategory.THEME]: 'theme',
        [Contract_2.ContractCategory.SKIN]: 'skin',
        [Contract_2.ContractCategory.UTILITY]: 'utility'
    };
    return {
        name: contract.name.value,
        category: categoryMap[contract.category],
        version: contract.version,
        ...(contract.description && { description: contract.description }),
        variants: [...contract.variants],
        props: [...contract.props],
        accessibility: contract.accessibility,
        validation: contract.validation,
        metadata: contract.metadata,
        status: contract.status
    };
}
/**
 * Checks if a contract configuration is valid using DDD validation
 * @param config Contract configuration
 * @returns Validation result
 */
function isValidContractConfiguration(config) {
    try {
        const contract = createContractDDD(config);
        const validation = contract.validate();
        return validation.isValid;
    }
    catch (error) {
        return false;
    }
}
// =================================================================
// LEGACY UTILITY FUNCTIONS (DEPRECATED - DO NOT USE)
// =================================================================
// These functions are DEPRECATED. Use DDD services instead for proper domain modeling.
// Quick access to standard variants (DEPRECATED - use VariantFactory instead)
function getStandardVariants() {
    return {
        sizes: exports.uiSizes,
        intents: exports.uiIntents,
        tones: exports.uiTones,
        emphases: exports.uiEmphases
    };
}
//# sourceMappingURL=index.js.map