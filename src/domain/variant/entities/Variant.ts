/**
 * Variant Domain Entity
 * Represents a variant with its type and allowed values
 */

import { BaseEntity } from '../../shared/BaseEntity'
import { VariantType } from '../../shared/value-objects/VariantType'
import { VariantCreatedEvent } from '../../shared/events/DomainEvent'

export class Variant extends BaseEntity {
  private readonly _values: string[]

  constructor(
    id: string,
    private readonly _type: VariantType,
    values: string[]
  ) {
    super(id)
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('Variant must have at least one value')
    }

    // Validate all values are strings and unique
    const uniqueValues = [...new Set(values)]
    if (uniqueValues.length !== values.length) {
      throw new Error('Variant values must be unique')
    }

    this._values = uniqueValues
  }

  static create(type: VariantType, values: string[]): Variant {
    const variant = new Variant(type.value, type, values)
    // Domain event would be published by application service
    return variant
  }

  static createSizeVariant(values: string[]): Variant {
    return new Variant(VariantType.SIZE.value, VariantType.SIZE, values)
  }

  static createIntentVariant(values: string[]): Variant {
    return new Variant(VariantType.INTENT.value, VariantType.INTENT, values)
  }

  static createToneVariant(values: string[]): Variant {
    return new Variant(VariantType.TONE.value, VariantType.TONE, values)
  }

  static createEmphasisVariant(values: string[]): Variant {
    return new Variant(VariantType.EMPHASIS.value, VariantType.EMPHASIS, values)
  }

  // Getters
  get type(): VariantType {
    return this._type
  }

  get values(): readonly string[] {
    return [...this._values]
  }

  get count(): number {
    return this._values.length
  }

  // Business methods
  hasValue(value: string): boolean {
    return this._values.includes(value)
  }

  addValue(value: string): void {
    if (this._values.includes(value)) {
      throw new Error(`Value '${value}' already exists in variant`)
    }
    this._values.push(value)
    this.markAsModified()
  }

  removeValue(value: string): boolean {
    const index = this._values.indexOf(value)
    if (index === -1) {
      return false
    }

    if (this._values.length === 1) {
      throw new Error('Cannot remove the last value from a variant')
    }

    this._values.splice(index, 1)
    this.markAsModified()
    return true
  }

  override equals(other: Variant): boolean {
    return this._type.equals(other._type) &&
           this._values.length === other._values.length &&
           this._values.every(value => other._values.includes(value))
  }

  // Serialization
  toPrimitives() {
    return {
      type: this._type.value,
      values: this._values
    }
  }

  toDomainEvent(): VariantCreatedEvent {
    return new VariantCreatedEvent(this._type.value, this._values)
  }
}