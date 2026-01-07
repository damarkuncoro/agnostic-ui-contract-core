/**
 * Create Variant Use Case
 * Application layer use case for variant creation
 */
import { Variant } from '../../domain/variant/entities/Variant';
import { VariantType } from '../../domain/shared/value-objects/VariantType';
import { IVariantFactory } from '../../domain/variant/services/VariantFactory';
export interface CreateVariantRequest {
    type: VariantType;
    values: string[];
}
export interface CreateVariantResponse {
    variant: Variant;
    success: boolean;
    message?: string;
}
export interface ICreateVariantUseCase {
    createVariant(request: CreateVariantRequest): Promise<CreateVariantResponse>;
    createStandardVariants(): Promise<CreateVariantResponse[]>;
}
export declare class CreateVariantUseCaseImpl implements ICreateVariantUseCase {
    private readonly variantFactory;
    constructor(variantFactory: IVariantFactory);
    createVariant(request: CreateVariantRequest): Promise<CreateVariantResponse>;
    createStandardVariants(): Promise<CreateVariantResponse[]>;
}
//# sourceMappingURL=CreateVariantUseCase.d.ts.map