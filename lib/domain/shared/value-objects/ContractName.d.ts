/**
 * Contract Name Value Object
 * Represents a contract name with validation
 */
export declare class ContractName {
    private readonly _value;
    private constructor();
    static create(value: string): ContractName;
    static fromString(value: string): ContractName;
    get value(): string;
    equals(other: ContractName): boolean;
    toString(): string;
}
//# sourceMappingURL=ContractName.d.ts.map