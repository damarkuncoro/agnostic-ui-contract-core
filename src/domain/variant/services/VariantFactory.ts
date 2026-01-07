/**
 * Variant Factory Domain Service
 * Creates and manages variants with business logic
 */

import { Variant } from '../entities/Variant'
import { VariantType } from '../../shared/value-objects/VariantType'

export interface IVariantFactory {
  createVariant(type: VariantType, values: string[]): Variant
  createStandardVariants(): Map<VariantType, Variant>
  getStandardVariant(type: VariantType): Variant
}

export class VariantFactory implements IVariantFactory {
  // Standard variant definitions
  private static readonly STANDARD_VARIANTS = {
    [VariantType.SIZE.value]: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    [VariantType.INTENT.value]: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    [VariantType.TONE.value]: ['subtle', 'normal', 'strong'],
    [VariantType.EMPHASIS.value]: ['low', 'medium', 'high']
  }

  createVariant(type: VariantType, values: string[]): Variant {
    return Variant.create(type, values)
  }

  createStandardVariants(): Map<VariantType, Variant> {
    const variants = new Map<VariantType, Variant>()

    Object.entries(VariantFactory.STANDARD_VARIANTS).forEach(([typeValue, values]) => {
      const type = VariantType.create(typeValue)
      const variant = this.createVariant(type, values)
      variants.set(type, variant)
    })

    return variants
  }

  getStandardVariant(type: VariantType): Variant {
    const values = VariantFactory.STANDARD_VARIANTS[type.value]
    if (!values) {
      throw new Error(`No standard variant defined for type: ${type.value}`)
    }
    return this.createVariant(type, values)
  }

  // Convenience methods for common variants
  createSizeVariant(values: string[] = VariantFactory.STANDARD_VARIANTS.size): Variant {
    return Variant.createSizeVariant(values)
  }

  createIntentVariant(values: string[] = VariantFactory.STANDARD_VARIANTS.intent): Variant {
    return Variant.createIntentVariant(values)
  }

  createToneVariant(values: string[] = VariantFactory.STANDARD_VARIANTS.tone): Variant {
    return Variant.createToneVariant(values)
  }

  createEmphasisVariant(values: string[] = VariantFactory.STANDARD_VARIANTS.emphasis): Variant {
    return Variant.createEmphasisVariant(values)
  }
}