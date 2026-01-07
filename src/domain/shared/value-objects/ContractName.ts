/**
 * Contract Name Value Object
 * Represents a contract name with validation
 */

export class ContractName {
  private constructor(private readonly _value: string) {}

  static create(value: string): ContractName {
    if (!value || typeof value !== 'string') {
      throw new Error('Contract name must be a non-empty string')
    }

    // Validation: lowercase, alphanumeric, dashes only
    const validName = /^[a-z][a-z0-9-]*$/
    if (!validName.test(value)) {
      throw new Error('Contract name must be lowercase with only alphanumeric characters and dashes')
    }

    return new ContractName(value)
  }

  static fromString(value: string): ContractName {
    return ContractName.create(value)
  }

  get value(): string {
    return this._value
  }

  equals(other: ContractName): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}