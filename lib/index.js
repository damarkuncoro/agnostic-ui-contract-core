"use strict";
// =================================================================
// Agnostic UI Contract Core
//
// This package provides the foundational types, utilities, and constants
// that all contracts in the Agnostic UI ecosystem build upon. It ensures
// consistency and provides common functionality across all component contracts.
// =================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiA11yKeyboardActions = exports.uiA11yRoles = exports.uiEmphases = exports.uiTones = exports.uiIntents = exports.uiSizes = void 0;
exports.createPropSchema = createPropSchema;
exports.createA11yRules = createA11yRules;
exports.createChildrenRules = createChildrenRules;
exports.validatePropValue = validatePropValue;
exports.getPropDefault = getPropDefault;
exports.isPropRequired = isPropRequired;
exports.createContract = createContract;
exports.validateContract = validateContract;
// -----------------------------------------------------------------
// Constants & Arrays
// -----------------------------------------------------------------
/**
 * Standard size variants available across all components
 */
exports.uiSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
/**
 * Standard intent variants for interactive components
 */
exports.uiIntents = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'neutral'
];
/**
 * Standard tone variants for visual weight adjustment
 */
exports.uiTones = ['subtle', 'normal', 'strong'];
/**
 * Standard emphasis variants for prominence adjustment
 */
exports.uiEmphases = ['low', 'medium', 'high'];
/**
 * Standard ARIA roles that components can implement
 */
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
/**
 * Standard keyboard actions that components should support
 */
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
// -----------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------
/**
 * Creates a standardized property schema object
 */
function createPropSchema(options) {
    return {
        type: options.type,
        required: options.required ?? false,
        default: options.default,
        enum: options.enum,
        description: options.description,
        validation: options.validation
    };
}
/**
 * Creates accessibility rules for a component
 */
function createA11yRules(rules) {
    return {
        role: rules.role,
        label: rules.label ?? false,
        keyboard: rules.keyboard ?? [],
        focusable: rules.focusable ?? true,
        ...rules
    };
}
/**
 * Creates children rules for a component
 */
function createChildrenRules(rules) {
    return {
        allowed: rules.allowed,
        max: rules.max,
        min: rules.min ?? 0,
        ordered: rules.ordered ?? false
    };
}
/**
 * Validates that a value matches a property schema
 */
function validatePropValue(value, schema) {
    // Check type
    if (schema.type === 'string' && typeof value !== 'string')
        return false;
    if (schema.type === 'number' && typeof value !== 'number')
        return false;
    if (schema.type === 'boolean' && typeof value !== 'boolean')
        return false;
    if (schema.type === 'array' && !Array.isArray(value))
        return false;
    if (schema.type === 'object' && (typeof value !== 'object' || value === null))
        return false;
    // Check enum values
    if (schema.enum && !schema.enum.includes(value))
        return false;
    // Additional validation can be added here
    if (schema.validation) {
        // Custom validation logic
    }
    return true;
}
/**
 * Gets the default value for a property schema
 */
function getPropDefault(schema) {
    return schema.default;
}
/**
 * Checks if a property is required
 */
function isPropRequired(schema) {
    return schema.required ?? false;
}
// -----------------------------------------------------------------
// Contract Builder Utilities
// -----------------------------------------------------------------
/**
 * Helper to create a complete contract definition with sensible defaults
 */
function createContract(options) {
    return {
        name: options.name,
        displayName: options.displayName,
        category: options.category,
        propsSchema: options.propsSchema ?? {},
        variants: options.variants ?? {},
        events: options.events ?? [],
        accessibility: createA11yRules(options.accessibility ?? {}),
        children: options.children,
        version: options.version ?? '1.0.0',
        metadata: options.metadata
    };
}
// -----------------------------------------------------------------
// Validation Helpers
// -----------------------------------------------------------------
/**
 * Validates a complete contract definition
 */
function validateContract(contract) {
    const errors = [];
    // Required fields
    if (!contract.name)
        errors.push('Contract name is required');
    if (!contract.displayName)
        errors.push('Contract displayName is required');
    if (!contract.category)
        errors.push('Contract category is required');
    // Name format validation
    if (contract.name && !/^[a-z][a-z0-9-]*$/.test(contract.name)) {
        errors.push('Contract name must be lowercase with hyphens only');
    }
    // Props schema validation
    if (contract.propsSchema) {
        for (const [propName, schema] of Object.entries(contract.propsSchema)) {
            if (!schema.type) {
                errors.push(`Property '${propName}' missing type`);
            }
        }
    }
    // Events validation
    if (contract.events) {
        const invalidEvents = contract.events.filter(event => !event.startsWith('on'));
        if (invalidEvents.length > 0) {
            errors.push(`Events must start with 'on': ${invalidEvents.join(', ')}`);
        }
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
