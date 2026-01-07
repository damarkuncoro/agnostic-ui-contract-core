"use strict";
// =================================================================
// Agnostic UI Contract Core - Domain-Driven Architecture
//
// This package provides the foundational types, utilities, and constants
// that all contracts in the Agnostic UI ecosystem build upon. It ensures
// consistency and provides common functionality across all component contracts.
// =================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractCoreService = exports.uiA11yKeyboardActions = exports.uiA11yRoles = exports.uiEmphases = exports.uiTones = exports.uiIntents = exports.uiSizes = exports.CreateVariantUseCaseImpl = exports.Variant = exports.VariantType = exports.ContractName = void 0;
exports.getStandardVariants = getStandardVariants;
// Initialize bootstrap
require("./bootstrap");
// -----------------------------------------------------------------
// Domain Layer Exports
// -----------------------------------------------------------------
// Value Objects
var ContractName_1 = require("./domain/shared/value-objects/ContractName");
Object.defineProperty(exports, "ContractName", { enumerable: true, get: function () { return ContractName_1.ContractName; } });
var VariantType_1 = require("./domain/shared/value-objects/VariantType");
Object.defineProperty(exports, "VariantType", { enumerable: true, get: function () { return VariantType_1.VariantType; } });
// Entities
var Variant_1 = require("./domain/variant/entities/Variant");
Object.defineProperty(exports, "Variant", { enumerable: true, get: function () { return Variant_1.Variant; } });
var CreateVariantUseCase_1 = require("./application/use-cases/CreateVariantUseCase");
Object.defineProperty(exports, "CreateVariantUseCaseImpl", { enumerable: true, get: function () { return CreateVariantUseCase_1.CreateVariantUseCaseImpl; } });
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
// Legacy utility functions (deprecated - use domain services and use cases)
// These functions are defined below in this file
// -----------------------------------------------------------------
// Convenience Exports
// -----------------------------------------------------------------
// Factory functions for common operations
const bootstrap_1 = require("./bootstrap");
Object.defineProperty(exports, "getContractCoreService", { enumerable: true, get: function () { return bootstrap_1.getContractCoreService; } });
// Quick access to standard variants
function getStandardVariants() {
    const variantFactory = (0, bootstrap_1.getContractCoreService)('IVariantFactory');
    return variantFactory.createStandardVariants();
}
