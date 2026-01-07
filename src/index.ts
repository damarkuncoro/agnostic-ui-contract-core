// =================================================================
// Agnostic UI Contract Core - Domain-Driven Architecture
//
// This package provides the foundational types, utilities, and constants
// that all contracts in the Agnostic UI ecosystem build upon. It ensures
// consistency and provides common functionality across all component contracts.
// =================================================================

// Initialize bootstrap
import './bootstrap'

// -----------------------------------------------------------------
// Domain Layer Exports
// -----------------------------------------------------------------

// Value Objects
export { ContractName } from './domain/shared/value-objects/ContractName'
export { VariantType } from './domain/shared/value-objects/VariantType'

// Entities
export { Variant } from './domain/variant/entities/Variant'

// Domain Events
export type {
  ContractDomainEvent,
  ContractCreatedEvent,
  ContractValidatedEvent,
  VariantCreatedEvent,
  PropSchemaCreatedEvent
} from './domain/shared/events/DomainEvent'

// Domain Services
export type { IVariantFactory } from './domain/variant/services/VariantFactory'

// -----------------------------------------------------------------
// Application Layer Exports
// -----------------------------------------------------------------

// Use Cases
export type { ICreateVariantUseCase } from './application/use-cases/CreateVariantUseCase'
export { CreateVariantUseCaseImpl } from './application/use-cases/CreateVariantUseCase'

// -----------------------------------------------------------------
// Infrastructure Layer Exports
// -----------------------------------------------------------------

// Repositories
export type { IVariantRepository } from './infrastructure/repositories/VariantRepository'

// -----------------------------------------------------------------
// Legacy Compatibility Layer (will be deprecated)
// -----------------------------------------------------------------

// Re-export legacy types for backward compatibility
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

// Legacy utility functions (deprecated - use domain services and use cases)
// These functions are defined below in this file

// -----------------------------------------------------------------
// Convenience Exports
// -----------------------------------------------------------------

// Factory functions for common operations
import { getContractCoreService } from './bootstrap'
export { getContractCoreService }

// Quick access to standard variants
export function getStandardVariants() {
  const variantFactory = getContractCoreService<any>('IVariantFactory')
  return variantFactory.createStandardVariants()
}
