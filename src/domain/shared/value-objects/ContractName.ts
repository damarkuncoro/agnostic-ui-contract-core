/**
 * Contract Name Value Object
 * Represents a contract name with validation
 */

import { ValueObject } from '../ValueObject';

export class ContractName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate();
  }

  /**
   * Creates a new ContractName instance
   * @param value The contract name to validate
   * @returns ContractName instance
   * @throws Error if validation fails
   */
  static create(value: string): ContractName {
    return new ContractName(value);
  }

  /**
   * Creates ContractName from string (alias for create)
   * @param value The contract name string
   * @returns ContractName instance
   */
  static fromString(value: string): ContractName {
    return ContractName.create(value);
  }

  /**
   * Validates the contract name
   * @private
   */
  private validate(): void {
    if (!this._value || typeof this._value !== 'string') {
      throw new Error('Contract name must be a non-empty string');
    }

    // Validation: lowercase, alphanumeric, dashes only
    const validName = /^[a-z][a-z0-9-]*$/;
    if (!validName.test(this._value)) {
      throw new Error('Contract name must be lowercase with only alphanumeric characters and dashes');
    }

    // Length validation
    if (this._value.length < 2) {
      throw new Error('Contract name must be at least 2 characters long');
    }

    if (this._value.length > 50) {
      throw new Error('Contract name must not exceed 50 characters');
    }
  }

  /**
   * Gets the contract name value
   */
  get value(): string {
    return this._value;
  }

  /**
   * Gets the namespace part of the contract name (before first dash)
   */
  getNamespace(): string {
    const parts = this._value.split('-');
    return parts[0];
  }

  /**
   * Gets the component part of the contract name (after first dash)
   */
  getComponent(): string {
    const parts = this._value.split('-');
    return parts.slice(1).join('-') || this._value;
  }

  /**
   * Checks if this is a core contract
   */
  isCoreContract(): boolean {
    return this.getNamespace() === 'core';
  }

  /**
   * Checks if this is a component contract
   */
  isComponentContract(): boolean {
    return !this.isCoreContract();
  }

  /**
   * Creates a child contract name
   */
  createChild(childName: string): ContractName {
    const validChild = /^[a-z][a-z0-9-]*$/;
    if (!validChild.test(childName)) {
      throw new Error('Child name must be lowercase with only alphanumeric characters and dashes');
    }

    return ContractName.create(`${this._value}-${childName}`);
  }

  /**
   * Gets the parent contract name
   */
  getParent(): ContractName | null {
    const parts = this._value.split('-');
    if (parts.length <= 1) return null;

    const parentName = parts.slice(0, -1).join('-');
    return ContractName.create(parentName);
  }

  /**
   * Checks if this contract is a child of another contract
   */
  isChildOf(parent: ContractName): boolean {
    return this._value.startsWith(`${parent._value}-`);
  }

  /**
   * Gets the hierarchy level (number of dashes + 1)
   */
  getHierarchyLevel(): number {
    return this._value.split('-').length;
  }

  toString(): string {
    return this._value;
  }
}