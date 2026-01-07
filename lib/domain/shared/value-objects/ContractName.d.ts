/**
 * Contract Name Value Object
 * Represents a contract name with validation
 */
import { ValueObject } from '../ValueObject';
export declare class ContractName extends ValueObject<string> {
    private constructor();
    /**
     * Creates a new ContractName instance
     * @param value The contract name to validate
     * @returns ContractName instance
     * @throws Error if validation fails
     */
    static create(value: string): ContractName;
    /**
     * Creates ContractName from string (alias for create)
     * @param value The contract name string
     * @returns ContractName instance
     */
    static fromString(value: string): ContractName;
    /**
     * Validates the contract name
     * @private
     */
    private validate;
    /**
     * Gets the contract name value
     */
    get value(): string;
    /**
     * Gets the namespace part of the contract name (before first dash)
     */
    getNamespace(): string;
    /**
     * Gets the component part of the contract name (after first dash)
     */
    getComponent(): string;
    /**
     * Checks if this is a core contract
     */
    isCoreContract(): boolean;
    /**
     * Checks if this is a component contract
     */
    isComponentContract(): boolean;
    /**
     * Creates a child contract name
     */
    createChild(childName: string): ContractName;
    /**
     * Gets the parent contract name
     */
    getParent(): ContractName | null;
    /**
     * Checks if this contract is a child of another contract
     */
    isChildOf(parent: ContractName): boolean;
    /**
     * Gets the hierarchy level (number of dashes + 1)
     */
    getHierarchyLevel(): number;
    toString(): string;
}
//# sourceMappingURL=ContractName.d.ts.map