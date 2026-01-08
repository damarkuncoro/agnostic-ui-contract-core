import './bootstrap';
export { Contract, ContractStatus, ContractCategory } from './domain/contract/entities/Contract';
export { ContractName } from './domain/shared/value-objects/ContractName';
export { Variant } from './domain/variant/entities/Variant';
export { VariantType } from './domain/shared/value-objects/VariantType';
export { CreateContractUseCase } from './application/use-cases/CreateContractUseCase';
export type { CreateContractInput, CreateContractOutput } from './application/use-cases/CreateContractUseCase';
export { CreateVariantUseCaseImpl as CreateVariantUseCase } from './application/use-cases/CreateVariantUseCase';
export type { CreateVariantRequest, CreateVariantResponse, ICreateVariantUseCase } from './application/use-cases/CreateVariantUseCase';
export { SchemaContractValidator } from './infrastructure/validators/SchemaContractValidator';
export type { IContractValidator } from './domain/contract/services/IContractValidator';
export { InMemoryVariantRepository, VariantRepositoryFactory } from './infrastructure/repositories/VariantRepository';
export type { IVariantRepository } from './infrastructure/repositories/VariantRepository';
export { VariantFactory } from './domain/variant/services/VariantFactory';
export type { IVariantFactory } from './domain/variant/services/VariantFactory';
export type { ContractDomainEvent, ContractCreatedEvent, ContractValidatedEvent, VariantCreatedEvent, PropSchemaCreatedEvent } from './domain/shared/events/DomainEvent';
export type { IDomainEventPublisher, DomainEventHandler } from './domain/shared/events/DomainEventPublisher';
export { InMemoryDomainEventPublisher, BaseDomainEventHandler, CompositeDomainEventHandler, domainEventPublisher } from './domain/shared/events/DomainEventPublisher';
export { DomainError, ValidationError, NotFoundError, BusinessRuleViolationError, ConcurrencyError, AuthorizationError, InfrastructureError, ConfigurationError } from './domain/shared/errors/DomainError';
export { ErrorHandler } from './domain/shared/errors/ErrorHandler';
export type { ICache, CacheEntry } from './infrastructure/cache/Cache';
export { InMemoryCache, LRUCache, Cached, CacheKeyGenerator } from './infrastructure/cache/Cache';
export { getCreateContractUseCase, getSchemaContractValidator, getContractValidators, getContractCoreService } from './bootstrap';
export type { ContractCategory as LegacyContractCategory, ContractDefinition, PropSchema, ChildrenRules, AccessibilityRules, UiVariantSize, UiVariantIntent, UiVariantTone, UiVariantEmphasis, UiA11yRole, UiA11yKeyboardAction, ContractProps, ContractEvents } from './types';
export declare const uiSizes: readonly string[];
export declare const uiIntents: readonly string[];
export declare const uiTones: readonly string[];
export declare const uiEmphases: readonly string[];
export declare const uiA11yRoles: readonly string[];
export declare const uiA11yKeyboardActions: readonly string[];
import { Contract } from './domain/contract/entities/Contract';
import type { CreateContractInput, CreateContractVariantInput, CreateContractPropInput } from './application/use-cases/CreateContractUseCase';
/**
 * Migrates legacy contract creation to DDD Contract entity
 * @param legacyConfig Legacy contract configuration
 * @returns DDD Contract entity
 */
export declare function createContractDDD(legacyConfig: {
    name: string;
    category?: string;
    version?: string;
    description?: string;
    variants?: any[];
    props?: any[];
    accessibility?: any;
    validation?: any;
    metadata?: Record<string, any>;
}): Contract;
/**
 * Migrates legacy contract validation to DDD use case
 * @param legacyConfig Legacy contract configuration
 * @returns Promise resolving to validation result
 */
export declare function validateContractDDD(legacyConfig: {
    name: string;
    category?: string;
    version?: string;
    description?: string;
    variants?: any[];
    props?: any[];
    accessibility?: any;
    validation?: any;
    metadata?: Record<string, any>;
}): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    contract: Contract;
}>;
/**
 * Creates a standard component contract using DDD
 * @param name Contract name
 * @param options Additional options
 * @returns CreateContractInput for standard component
 */
export declare function createStandardComponentContract(name: string, options?: {
    includeAccessibility?: boolean;
    includeValidation?: boolean;
    customVariants?: CreateContractVariantInput[];
    customProps?: CreateContractPropInput[];
}): CreateContractInput;
/**
 * Converts DDD Contract entity back to legacy format
 * @param contract DDD Contract entity
 * @returns Legacy contract format
 */
export declare function convertContractToLegacy(contract: Contract): {
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
};
/**
 * Checks if a contract configuration is valid using DDD validation
 * @param config Contract configuration
 * @returns Validation result
 */
export declare function isValidContractConfiguration(config: any): boolean;
export declare function getStandardVariants(): {
    sizes: readonly string[];
    intents: readonly string[];
    tones: readonly string[];
    emphases: readonly string[];
};
//# sourceMappingURL=index.d.ts.map