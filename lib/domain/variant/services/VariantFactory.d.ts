/**
 * Variant Factory Domain Service
 * Creates and manages variants with business logic
 */
import { Variant } from '../entities/Variant';
import { VariantType } from '../../shared/value-objects/VariantType';
export interface IVariantFactory {
    createVariant(type: VariantType, values: string[]): Variant;
    createStandardVariants(): Map<VariantType, Variant>;
    getStandardVariant(type: VariantType): Variant;
}
export declare class VariantFactory implements IVariantFactory {
    private static readonly STANDARD_VARIANTS;
    createVariant(type: VariantType, values: string[]): Variant;
    createStandardVariants(): Map<VariantType, Variant>;
    getStandardVariant(type: VariantType): Variant;
    createSizeVariant(values?: string[]): Variant;
    createIntentVariant(values?: string[]): Variant;
    createToneVariant(values?: string[]): Variant;
    createEmphasisVariant(values?: string[]): Variant;
}
//# sourceMappingURL=VariantFactory.d.ts.map