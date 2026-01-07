/**
 * Contract-Core Application Bootstrap
 * Sets up dependency injection container for contract operations using DDD principles
 */

import { CreateContractUseCase } from './application/use-cases/CreateContractUseCase';
import { SchemaContractValidator } from './infrastructure/validators/SchemaContractValidator';
import { IContractValidator } from './domain/contract/services/IContractValidator';

// Service container for dependency injection
class ContractCoreServiceContainer {
  private static instance: ContractCoreServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): ContractCoreServiceContainer {
    if (!ContractCoreServiceContainer.instance) {
      ContractCoreServiceContainer.instance = new ContractCoreServiceContainer();
    }
    return ContractCoreServiceContainer.instance;
  }

  private initializeServices(): void {
    // Infrastructure - Contract Validators
    const schemaValidator = new SchemaContractValidator();
    this.services.set('SchemaContractValidator', schemaValidator);

    // Contract Validators Array
    const contractValidators: IContractValidator[] = [schemaValidator];
    this.services.set('ContractValidators', contractValidators);

    // Application Services
    this.services.set('CreateContractUseCase', new CreateContractUseCase(contractValidators));
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service not found: ${serviceName}`);
    }
    return service;
  }

  // Convenience methods for commonly used services
  getCreateContractUseCase(): CreateContractUseCase {
    return this.get<CreateContractUseCase>('CreateContractUseCase');
  }

  getSchemaContractValidator(): SchemaContractValidator {
    return this.get<SchemaContractValidator>('SchemaContractValidator');
  }

  getContractValidators(): IContractValidator[] {
    return this.get<IContractValidator[]>('ContractValidators');
  }
}

// Export singleton instance
export const contractCoreServiceContainer = ContractCoreServiceContainer.getInstance();

// Export convenience functions
export function getCreateContractUseCase(): CreateContractUseCase {
  return contractCoreServiceContainer.getCreateContractUseCase();
}

export function getSchemaContractValidator(): SchemaContractValidator {
  return contractCoreServiceContainer.getSchemaContractValidator();
}

export function getContractValidators(): IContractValidator[] {
  return contractCoreServiceContainer.getContractValidators();
}

// Export service locator function for generic access
export function getContractCoreService<T>(serviceName: string): T {
  return contractCoreServiceContainer.get<T>(serviceName);
}