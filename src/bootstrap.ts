/**
 * Contract-Core Application Bootstrap
 * Sets up dependency injection container for contract operations
 */

import { VariantFactory } from './domain/variant/services/VariantFactory'
import { CreateVariantUseCaseImpl } from './application/use-cases/CreateVariantUseCase'
import { InMemoryVariantRepository, VariantRepositoryFactory } from './infrastructure/repositories/VariantRepository'

// Simple container for contract-core dependencies
class ContractCoreContainer {
  private services = new Map<string, any>()

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory)
  }

  registerSingleton<T>(key: string, instance: T): void {
    this.services.set(key, () => instance)
  }

  resolve<T>(key: string): T {
    const factory = this.services.get(key)
    if (!factory) {
      throw new Error(`Service ${key} not registered`)
    }
    return factory()
  }
}

// Global contract-core container
export const contractCoreContainer = new ContractCoreContainer()

// Register domain services
contractCoreContainer.registerSingleton('IVariantFactory', new VariantFactory())

// Register infrastructure services
contractCoreContainer.registerSingleton('IVariantRepository', VariantRepositoryFactory.createInMemory())

// Register application services
contractCoreContainer.register('CreateVariantUseCase', () => {
  const variantFactory = contractCoreContainer.resolve<VariantFactory>('IVariantFactory')
  return new CreateVariantUseCaseImpl(variantFactory)
})

// Helper function to get services
export function getContractCoreService<T>(key: string): T {
  return contractCoreContainer.resolve<T>(key)
}