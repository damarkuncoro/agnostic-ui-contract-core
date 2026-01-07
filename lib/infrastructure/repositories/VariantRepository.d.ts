/**
 * Variant Repository Infrastructure Service
 * Manages variant persistence and retrieval
 */
import { Variant } from '../../domain/variant/entities/Variant';
import { VariantType } from '../../domain/shared/value-objects/VariantType';
export interface IVariantRepository {
    save(variant: Variant): Promise<void>;
    findByType(type: VariantType): Promise<Variant | null>;
    findAll(): Promise<Variant[]>;
    delete(type: VariantType): Promise<boolean>;
    exists(type: VariantType): Promise<boolean>;
}
export declare class InMemoryVariantRepository implements IVariantRepository {
    private variants;
    save(variant: Variant): Promise<void>;
    findByType(type: VariantType): Promise<Variant | null>;
    findAll(): Promise<Variant[]>;
    delete(type: VariantType): Promise<boolean>;
    exists(type: VariantType): Promise<boolean>;
    clear(): void;
}
export declare class VariantRepositoryFactory {
    static createInMemory(): IVariantRepository;
}
//# sourceMappingURL=VariantRepository.d.ts.map