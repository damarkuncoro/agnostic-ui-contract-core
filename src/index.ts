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

// Initialize bootstrap
import './bootstrap'

// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================

// Domain Layer - Why It Matters:
// The domain layer contains the core business logic and rules. Entities represent
// business concepts with identity and behavior, while Value Objects represent
// immutable descriptive aspects. This separation ensures business rules are
// preserved and testable independently of infrastructure concerns.
export { Contract, ContractStatus, ContractCategory } from './domain/contract/entities/Contract';
export { ContractName } from './domain/shared/value-objects/ContractName';
export { Variant } from './domain/variant/entities/Variant';
export { VariantType } from './domain/shared/value-objects/VariantType';

// Application Layer - Why It Matters:
// Use Cases orchestrate complex business operations and coordinate between
// domain objects. They encapsulate application-specific logic while keeping
// the domain layer pure and focused on business rules.
export { CreateContractUseCase } from './application/use-cases/CreateContractUseCase';
export type {
  CreateContractInput,
  CreateContractOutput
} from './application/use-cases/CreateContractUseCase';
export { CreateVariantUseCaseImpl as CreateVariantUseCase } from './application/use-cases/CreateVariantUseCase';
export type {
  CreateVariantRequest,
  CreateVariantResponse,
  ICreateVariantUseCase
} from './application/use-cases/CreateVariantUseCase';

// Infrastructure Layer - Why It Matters:
// Infrastructure concerns (persistence, external services, frameworks) are
// isolated here through interfaces and adapters. This allows the domain and
// application layers to remain independent and testable.
export { SchemaContractValidator } from './infrastructure/validators/SchemaContractValidator';
export type { IContractValidator } from './domain/contract/services/IContractValidator';
export { InMemoryVariantRepository, VariantRepositoryFactory } from './infrastructure/repositories/VariantRepository';
export type { IVariantRepository } from './infrastructure/repositories/VariantRepository';

// Domain Services - Why It Matters:
// Domain Services contain business logic that doesn't naturally belong to
// entities or value objects. They orchestrate complex operations across
// multiple domain objects while keeping business rules centralized.
export { VariantFactory } from './domain/variant/services/VariantFactory';
export type { IVariantFactory } from './domain/variant/services/VariantFactory';

// Domain Events - Why It Matters:
// Domain Events capture significant business moments and enable loose coupling between
// bounded contexts. They allow other parts of the system to react to important changes
// without tight dependencies, supporting eventual consistency and event-driven architecture.
export type {
  ContractDomainEvent,
  ContractCreatedEvent,
  ContractValidatedEvent,
  VariantCreatedEvent,
  PropSchemaCreatedEvent
} from './domain/shared/events/DomainEvent';

// Dependency Injection - Why It Matters:
// Provides centralized service management with clear scope and lifetime.
// Singleton pattern ensures consistent service instances across the application
// while maintaining testability through interface-based design. Services are
// initialized once and reused, reducing overhead and ensuring predictable behavior.
export {
  getCreateContractUseCase,
  getSchemaContractValidator,
  getContractValidators,
  getContractCoreService
} from './bootstrap';

// =================================================================
// LEGACY COMPATIBILITY LAYER - DEPRECATED (Migration Required)
// =================================================================
// ⚠️  WARNING: These exports are DEPRECATED and will be removed in future versions.
// ⚠️  Migrate to DDD exports above for better maintainability and type safety.
// ⚠️  Legacy types lack domain modeling and proper validation constraints.

// Re-export legacy types for backward compatibility (DO NOT USE IN NEW CODE)
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

// Legacy constants (DEPRECATED - use domain services instead)
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
// MIGRATION HELPERS - REQUIRED FOR LEGACY CODE
// =================================================================
// Use these functions to migrate from legacy to DDD. Replace legacy usage ASAP.

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
// LEGACY UTILITY FUNCTIONS (DEPRECATED - DO NOT USE)
// =================================================================
// These functions are DEPRECATED. Use DDD services instead for proper domain modeling.

// Quick access to standard variants (DEPRECATED - use VariantFactory instead)
export function getStandardVariants() {
  return {
    sizes: uiSizes,
    intents: uiIntents,
    tones: uiTones,
    emphases: uiEmphases
  };
}
