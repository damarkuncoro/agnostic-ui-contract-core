// =================================================================
// Agnostic UI Contract Core - Domain-Driven Architecture
//
// This package provides the foundational types, utilities, and constants
// that all contracts in the Agnostic UI ecosystem build upon. It ensures
// consistency and provides common functionality across all component contracts.
// =================================================================

// Initialize bootstrap
import './bootstrap'

// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================

// Domain Layer
export { Contract, ContractStatus, ContractCategory } from './domain/contract/entities/Contract';
export { ContractName } from './domain/shared/value-objects/ContractName';

// Application Layer
export { CreateContractUseCase } from './application/use-cases/CreateContractUseCase';
export type {
  CreateContractInput,
  CreateContractOutput
} from './application/use-cases/CreateContractUseCase';

// Infrastructure Layer
export { SchemaContractValidator } from './infrastructure/validators/SchemaContractValidator';
export type { IContractValidator } from './domain/contract/services/IContractValidator';

// Domain Events
export type {
  ContractDomainEvent,
  ContractCreatedEvent,
  ContractValidatedEvent,
  VariantCreatedEvent,
  PropSchemaCreatedEvent
} from './domain/shared/events/DomainEvent';

// Dependency Injection
export {
  getCreateContractUseCase,
  getSchemaContractValidator,
  getContractValidators,
  getContractCoreService
} from './bootstrap';

// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================

// Re-export legacy types for backward compatibility
export type {
  ContractCategory as LegacyContractCategory,
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

// Legacy constants (deprecated - use domain services)
export const uiSizes: readonly string[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
export const uiIntents: readonly string[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral'
] as const;
export const uiTones: readonly string[] = ['subtle', 'normal', 'strong'] as const;
export const uiEmphases: readonly string[] = ['low', 'medium', 'high'] as const;
export const uiA11yRoles: readonly string[] = [
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
export const uiA11yKeyboardActions: readonly string[] = [
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

// =================================================================
// MIGRATION HELPERS
// =================================================================

import { Contract, ContractCategory } from './domain/contract/entities/Contract';
import { ContractName } from './domain/shared/value-objects/ContractName';
import { getCreateContractUseCase } from './bootstrap';
import type {
  CreateContractInput,
  CreateContractVariantInput,
  CreateContractPropInput
} from './application/use-cases/CreateContractUseCase';

/**
 * Migrates legacy contract creation to DDD Contract entity
 * @param legacyConfig Legacy contract configuration
 * @returns DDD Contract entity
 */
export function createContractDDD(legacyConfig: {
  name: string;
  category?: string;
  version?: string;
  description?: string;
  variants?: any[];
  props?: any[];
  accessibility?: any;
  validation?: any;
  metadata?: Record<string, any>;
}): Contract {
  // Map legacy category to new enum
  const categoryMap: Record<string, ContractCategory> = {
    'core': ContractCategory.CORE,
    'component': ContractCategory.COMPONENT,
    'theme': ContractCategory.THEME,
    'skin': ContractCategory.SKIN,
    'utility': ContractCategory.UTILITY
  };

  const category = categoryMap[legacyConfig.category || 'component'] || ContractCategory.COMPONENT;

  return Contract.create({
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
export async function validateContractDDD(legacyConfig: {
  name: string;
  category?: string;
  version?: string;
  description?: string;
  variants?: any[];
  props?: any[];
  accessibility?: any;
  validation?: any;
  metadata?: Record<string, any>;
}): Promise<{ isValid: boolean; errors: string[]; warnings: string[]; contract: Contract }> {
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
export function createStandardComponentContract(name: string, options: {
  includeAccessibility?: boolean;
  includeValidation?: boolean;
  customVariants?: CreateContractVariantInput[];
  customProps?: CreateContractPropInput[];
} = {}): CreateContractInput {
  const useCase = getCreateContractUseCase();
  return useCase.createStandardComponentContract(name, options);
}

/**
 * Converts DDD Contract entity back to legacy format
 * @param contract DDD Contract entity
 * @returns Legacy contract format
 */
export function convertContractToLegacy(contract: Contract): {
  name: string;
  category: string;
  version: string;
  description?: string;
  variants: any[];
  props: any[];
  accessibility: any;
  validation: any;
  metadata: Record<string, any>;
  status: string;
} {
  // Map new category enum to legacy string
  const categoryMap: Record<ContractCategory, string> = {
    [ContractCategory.CORE]: 'core',
    [ContractCategory.COMPONENT]: 'component',
    [ContractCategory.THEME]: 'theme',
    [ContractCategory.SKIN]: 'skin',
    [ContractCategory.UTILITY]: 'utility'
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
export function isValidContractConfiguration(config: any): boolean {
  try {
    const contract = createContractDDD(config);
    const validation = contract.validate();
    return validation.isValid;
  } catch (error) {
    return false;
  }
}

// =================================================================
// LEGACY UTILITY FUNCTIONS (Deprecated)
// =================================================================

// Quick access to standard variants (deprecated - use DDD services)
export function getStandardVariants() {
  return {
    sizes: uiSizes,
    intents: uiIntents,
    tones: uiTones,
    emphases: uiEmphases
  };
}
