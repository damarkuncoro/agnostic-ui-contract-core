/**
 * Variant Domain Entity
 * Represents a variant with its type and allowed values
 */
import { VariantType } from '../../shared/value-objects/VariantType';
import { VariantCreatedEvent } from '../../shared/events/DomainEvent';
export declare class Variant {
    private readonly _type;
    private readonly _values;
    constructor(_type: VariantType, values: string[]);
    static create(type: VariantType, values: string[]): Variant;
    static createSizeVariant(values: string[]): Variant;
    static createIntentVariant(values: string[]): Variant;
    static createToneVariant(values: string[]): Variant;
    static createEmphasisVariant(values: string[]): Variant;
    get type(): VariantType;
    get values(): readonly string[];
    get count(): number;
    hasValue(value: string): boolean;
    addValue(value: string): void;
    removeValue(value: string): boolean;
    equals(other: Variant): boolean;
    toPrimitives(): {
        type: string;
        values: string[];
    };
    toDomainEvent(): VariantCreatedEvent;
}
//# sourceMappingURL=Variant.d.ts.map