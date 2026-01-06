// =================================================================
// Agnostic UI Contract Core
//
// This package provides the foundational types, utilities, and constants
// that all contracts in the Agnostic UI ecosystem build upon. It ensures
// consistency and provides common functionality across all component contracts.
// =================================================================

import type {
  ContractCategory,
  ContractDefinition,
  PropSchema,
  ChildrenRules,
  AccessibilityRules,
  UiVariantSize,
  UiVariantIntent,
  UiVariantTone,
  UiVariantEmphasis,
  UiA11yRole,
  UiA11yKeyboardAction
} from './types';

// -----------------------------------------------------------------
// Core Types
// -----------------------------------------------------------------

export type {
  ContractCategory,
  ContractDefinition,
  PropSchema,
  ChildrenRules,
  AccessibilityRules,
  UiVariantSize,
  UiVariantIntent,
  UiVariantTone,
  UiVariantEmphasis,
  UiA11yRole,
  UiA11yKeyboardAction,
  ContractProps,
  ContractEvents
} from './types';

// -----------------------------------------------------------------
// Constants & Arrays
// -----------------------------------------------------------------

/**
 * Standard size variants available across all components
 */
export const uiSizes: readonly UiVariantSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

/**
 * Standard intent variants for interactive components
 */
export const uiIntents: readonly UiVariantIntent[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral'
] as const;

/**
 * Standard tone variants for visual weight adjustment
 */
export const uiTones: readonly UiVariantTone[] = ['subtle', 'normal', 'strong'] as const;

/**
 * Standard emphasis variants for prominence adjustment
 */
export const uiEmphases: readonly UiVariantEmphasis[] = ['low', 'medium', 'high'] as const;

/**
 * Standard ARIA roles that components can implement
 */
export const uiA11yRoles: readonly UiA11yRole[] = [
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
] as const;

/**
 * Standard keyboard actions that components should support
 */
export const uiA11yKeyboardActions: readonly UiA11yKeyboardAction[] = [
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
] as const;

// -----------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------

/**
 * Creates a standardized property schema object
 */
export function createPropSchema(options: PropSchema): PropSchema {
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
export function createA11yRules(rules: AccessibilityRules): AccessibilityRules {
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
export function createChildrenRules(rules: ChildrenRules): ChildrenRules {
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
export function validatePropValue(value: any, schema: PropSchema): boolean {
  // Check type
  if (schema.type === 'string' && typeof value !== 'string') return false;
  if (schema.type === 'number' && typeof value !== 'number') return false;
  if (schema.type === 'boolean' && typeof value !== 'boolean') return false;
  if (schema.type === 'array' && !Array.isArray(value)) return false;
  if (schema.type === 'object' && (typeof value !== 'object' || value === null)) return false;

  // Check enum values
  if (schema.enum && !schema.enum.includes(value)) return false;

  // Additional validation can be added here
  if (schema.validation) {
    // Custom validation logic
  }

  return true;
}

/**
 * Gets the default value for a property schema
 */
export function getPropDefault(schema: PropSchema): any {
  return schema.default;
}

/**
 * Checks if a property is required
 */
export function isPropRequired(schema: PropSchema): boolean {
  return schema.required ?? false;
}

// -----------------------------------------------------------------
// Contract Builder Utilities
// -----------------------------------------------------------------

/**
 * Helper to create a complete contract definition with sensible defaults
 */
export function createContract(options: {
  name: string;
  displayName: string;
  category: ContractCategory;
  propsSchema?: Record<string, PropSchema>;
  variants?: Record<string, string[]>;
  events?: string[];
  accessibility?: Partial<AccessibilityRules>;
  children?: ChildrenRules;
  version?: string;
  metadata?: Record<string, any>;
}): ContractDefinition {
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
export function validateContract(contract: ContractDefinition): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!contract.name) errors.push('Contract name is required');
  if (!contract.displayName) errors.push('Contract displayName is required');
  if (!contract.category) errors.push('Contract category is required');

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
