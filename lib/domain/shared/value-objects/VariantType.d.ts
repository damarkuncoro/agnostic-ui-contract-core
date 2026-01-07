/**
 * Variant Type Value Object
 * Represents a variant type (size, intent, tone, etc.) with validation
 */
export declare class VariantType {
    private readonly _value;
    private constructor();
    static create(value: string): VariantType;
    static SIZE: VariantType;
    static INTENT: VariantType;
    static TONE: VariantType;
    static EMPHASIS: VariantType;
    get value(): string;
    equals(other: VariantType): boolean;
    toString(): string;
    isSize(): boolean;
    isIntent(): boolean;
    isTone(): boolean;
    isEmphasis(): boolean;
}
//# sourceMappingURL=VariantType.d.ts.map