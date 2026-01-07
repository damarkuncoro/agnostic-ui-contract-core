/**
 * Variant Type Value Object
 * Represents a variant type (size, intent, tone, etc.) with validation
 */

export class VariantType {
  private constructor(private readonly _value: string) {}

  static create(value: string): VariantType {
    if (!value || typeof value !== 'string') {
      throw new Error('Variant type must be a non-empty string')
    }

    // Validation: lowercase, alphanumeric only
    const validType = /^[a-z][a-z0-9]*$/
    if (!validType.test(value)) {
      throw new Error('Variant type must be lowercase with only alphanumeric characters')
    }

    return new VariantType(value)
  }

  static SIZE = VariantType.create('size')
  static INTENT = VariantType.create('intent')
  static TONE = VariantType.create('tone')
  static EMPHASIS = VariantType.create('emphasis')

  get value(): string {
    return this._value
  }

  equals(other: VariantType): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }

  isSize(): boolean {
    return this.equals(VariantType.SIZE)
  }

  isIntent(): boolean {
    return this.equals(VariantType.INTENT)
  }

  isTone(): boolean {
    return this.equals(VariantType.TONE)
  }

  isEmphasis(): boolean {
    return this.equals(VariantType.EMPHASIS)
  }
}