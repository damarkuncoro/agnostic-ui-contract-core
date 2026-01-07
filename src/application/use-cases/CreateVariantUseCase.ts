/**
 * Create Variant Use Case
 * Application layer use case for variant creation
 */

import { Variant } from '../../domain/variant/entities/Variant'
import { VariantType } from '../../domain/shared/value-objects/VariantType'
import { IVariantFactory } from '../../domain/variant/services/VariantFactory'

export interface CreateVariantRequest {
  type: VariantType
  values: string[]
}

export interface CreateVariantResponse {
  variant: Variant
  success: boolean
  message?: string
}

export interface ICreateVariantUseCase {
  createVariant(request: CreateVariantRequest): Promise<CreateVariantResponse>
  createStandardVariants(): Promise<CreateVariantResponse[]>
}

export class CreateVariantUseCaseImpl implements ICreateVariantUseCase {
  constructor(
    private readonly variantFactory: IVariantFactory
  ) {}

  async createVariant(request: CreateVariantRequest): Promise<CreateVariantResponse> {
    try {
      const variant = this.variantFactory.createVariant(request.type, request.values)
      return {
        variant,
        success: true,
        message: `Variant ${request.type.value} created successfully`
      }
    } catch (error) {
      return {
        variant: null as any,
        success: false,
        message: `Failed to create variant: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }

  async createStandardVariants(): Promise<CreateVariantResponse[]> {
    try {
      const standardVariants = this.variantFactory.createStandardVariants()
      const responses: CreateVariantResponse[] = []

      for (const [type, variant] of standardVariants) {
        responses.push({
          variant,
          success: true,
          message: `Standard variant ${type.value} created`
        })
      }

      return responses
    } catch (error) {
      return [{
        variant: null as any,
        success: false,
        message: `Failed to create standard variants: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    }
  }
}