"use strict";
// =================================================================
// Agnostic UI Contract Core - Domain-Driven Architecture
//
// This package provides the foundational types, utilities, and constants
// that all contracts in the Agnostic UI ecosystem build upon. It ensures
// consistency and provides common functionality across all component contracts.
// =================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiA11yKeyboardActions = exports.uiA11yRoles = exports.uiEmphases = exports.uiTones = exports.uiIntents = exports.uiSizes = exports.getContractCoreService = exports.getContractValidators = exports.getSchemaContractValidator = exports.getCreateContractUseCase = exports.SchemaContractValidator = exports.CreateContractUseCase = exports.ContractName = exports.ContractCategory = exports.ContractStatus = exports.Contract = void 0;
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
// Domain Layer
var Contract_1 = require("./domain/contract/entities/Contract");
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return Contract_1.Contract; } });
Object.defineProperty(exports, "ContractStatus", { enumerable: true, get: function () { return Contract_1.ContractStatus; } });
Object.defineProperty(exports, "ContractCategory", { enumerable: true, get: function () { return Contract_1.ContractCategory; } });
var ContractName_1 = require("./domain/shared/value-objects/ContractName");
Object.defineProperty(exports, "ContractName", { enumerable: true, get: function () { return ContractName_1.ContractName; } });
// Application Layer
var CreateContractUseCase_1 = require("./application/use-cases/CreateContractUseCase");
Object.defineProperty(exports, "CreateContractUseCase", { enumerable: true, get: function () { return CreateContractUseCase_1.CreateContractUseCase; } });
// Infrastructure Layer
var SchemaContractValidator_1 = require("./infrastructure/validators/SchemaContractValidator");
Object.defineProperty(exports, "SchemaContractValidator", { enumerable: true, get: function () { return SchemaContractValidator_1.SchemaContractValidator; } });
// Dependency Injection
var bootstrap_1 = require("./bootstrap");
Object.defineProperty(exports, "getCreateContractUseCase", { enumerable: true, get: function () { return bootstrap_1.getCreateContractUseCase; } });
Object.defineProperty(exports, "getSchemaContractValidator", { enumerable: true, get: function () { return bootstrap_1.getSchemaContractValidator; } });
Object.defineProperty(exports, "getContractValidators", { enumerable: true, get: function () { return bootstrap_1.getContractValidators; } });
Object.defineProperty(exports, "getContractCoreService", { enumerable: true, get: function () { return bootstrap_1.getContractCoreService; } });
// Legacy constants (deprecated - use domain services)
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
// MIGRATION HELPERS
// =================================================================
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
        version: legacyConfig.version,
        description: legacyConfig.description,
        variants: legacyConfig.variants,
        props: legacyConfig.props,
        accessibility: legacyConfig.accessibility,
        validation: legacyConfig.validation,
        metadata: legacyConfig.metadata
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
        description: contract.description,
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
// LEGACY UTILITY FUNCTIONS (Deprecated)
// =================================================================
// Quick access to standard variants (deprecated - use DDD services)
function getStandardVariants() {
    return {
        sizes: exports.uiSizes,
        intents: exports.uiIntents,
        tones: exports.uiTones,
        emphases: exports.uiEmphases
    };
}
