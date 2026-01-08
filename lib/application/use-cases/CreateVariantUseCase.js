"use strict";
/**
 * Create Variant Use Case
 * Application layer use case for variant creation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVariantUseCaseImpl = void 0;
class CreateVariantUseCaseImpl {
    constructor(variantFactory) {
        this.variantFactory = variantFactory;
    }
    async createVariant(request) {
        try {
            const variant = this.variantFactory.createVariant(request.type, request.values);
            return {
                variant,
                success: true,
                message: `Variant ${request.type.value} created successfully`
            };
        }
        catch (error) {
            return {
                variant: null,
                success: false,
                message: `Failed to create variant: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }
    async createStandardVariants() {
        try {
            const standardVariants = this.variantFactory.createStandardVariants();
            const responses = [];
            for (const [type, variant] of standardVariants) {
                responses.push({
                    variant,
                    success: true,
                    message: `Standard variant ${type.value} created`
                });
            }
            return responses;
        }
        catch (error) {
            return [{
                    variant: null,
                    success: false,
                    message: `Failed to create standard variants: ${error instanceof Error ? error.message : 'Unknown error'}`
                }];
        }
    }
}
exports.CreateVariantUseCaseImpl = CreateVariantUseCaseImpl;
//# sourceMappingURL=CreateVariantUseCase.js.map