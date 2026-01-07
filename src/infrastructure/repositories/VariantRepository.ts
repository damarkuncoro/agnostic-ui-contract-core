/**
 * Variant Repository Infrastructure Service
 * Manages variant persistence and retrieval
 */

import { Variant } from '../../domain/variant/entities/Variant'
import { VariantType } from '../../domain/shared/value-objects/VariantType'

export interface IVariantRepository {
  save(variant: Variant): Promise<void>
  findByType(type: VariantType): Promise<Variant | null>
  findAll(): Promise<Variant[]>
  delete(type: VariantType): Promise<boolean>
  exists(type: VariantType): Promise<boolean>
}

export class InMemoryVariantRepository implements IVariantRepository {
  private variants = new Map<string, Variant>()

  async save(variant: Variant): Promise<void> {
    this.variants.set(variant.type.value, variant)
  }

  async findByType(type: VariantType): Promise<Variant | null> {
    return this.variants.get(type.value) || null
  }

  async findAll(): Promise<Variant[]> {
    return Array.from(this.variants.values())
  }

  async delete(type: VariantType): Promise<boolean> {
    return this.variants.delete(type.value)
  }

  async exists(type: VariantType): Promise<boolean> {
    return this.variants.has(type.value)
  }

  // Utility method for testing
  clear(): void {
    this.variants.clear()
  }
}

// Factory for creating repositories
export class VariantRepositoryFactory {
  static createInMemory(): IVariantRepository {
    return new InMemoryVariantRepository()
  }

  // Could add other implementations like FileVariantRepository, DatabaseVariantRepository, etc.
}