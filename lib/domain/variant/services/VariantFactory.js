"use strict";
/**
 * Variant Factory Domain Service
 * Creates and manages variants with business logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantFactory = void 0;
const Variant_1 = require("../entities/Variant");
const VariantType_1 = require("../../shared/value-objects/VariantType");
class VariantFactory {
    createVariant(type, values) {
        return Variant_1.Variant.create(type, values);
    }
    createStandardVariants() {
        const variants = new Map();
        Object.entries(VariantFactory.STANDARD_VARIANTS).forEach(([typeValue, values]) => {
            const type = VariantType_1.VariantType.create(typeValue);
            const variant = this.createVariant(type, values);
            variants.set(type, variant);
        });
        return variants;
    }
    getStandardVariant(type) {
        const values = VariantFactory.STANDARD_VARIANTS[type.value];
        if (!values) {
            throw new Error(`No standard variant defined for type: ${type.value}`);
        }
        return this.createVariant(type, values);
    }
    // Convenience methods for common variants
    createSizeVariant(values = VariantFactory.STANDARD_VARIANTS.size) {
        return Variant_1.Variant.createSizeVariant(values);
    }
    createIntentVariant(values = VariantFactory.STANDARD_VARIANTS.intent) {
        return Variant_1.Variant.createIntentVariant(values);
    }
    createToneVariant(values = VariantFactory.STANDARD_VARIANTS.tone) {
        return Variant_1.Variant.createToneVariant(values);
    }
    createEmphasisVariant(values = VariantFactory.STANDARD_VARIANTS.emphasis) {
        return Variant_1.Variant.createEmphasisVariant(values);
    }
}
exports.VariantFactory = VariantFactory;
// Standard variant definitions
VariantFactory.STANDARD_VARIANTS = {
    [VariantType_1.VariantType.SIZE.value]: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    [VariantType_1.VariantType.INTENT.value]: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    [VariantType_1.VariantType.TONE.value]: ['subtle', 'normal', 'strong'],
    [VariantType_1.VariantType.EMPHASIS.value]: ['low', 'medium', 'high']
};
