/**
 * Base Value Object class providing immutability and equality
 */
export declare abstract class ValueObject<T = any> {
    protected readonly _value: T;
    constructor(value: T);
    get value(): T;
    equals(other: ValueObject<T>): boolean;
    private deepEquals;
    toString(): string;
}
//# sourceMappingURL=ValueObject.d.ts.map