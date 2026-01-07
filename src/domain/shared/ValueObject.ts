// packages/agnostic-ui-contract-core/src/domain/shared/ValueObject.ts

/**
 * Base Value Object class providing immutability and equality
 */
export abstract class ValueObject<T = any> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  equals(other: ValueObject<T>): boolean {
    if (!other) return false;
    if (this.constructor !== other.constructor) return false;

    // Deep equality check for primitive values
    return this.deepEquals(this._value, other._value);
  }

  private deepEquals(a: any, b: any): boolean {
    if (a === b) return true;

    if (a == null || b == null) return a === b;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.deepEquals(a[i], b[i])) return false;
      }
      return true;
    }

    if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;

      for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!this.deepEquals(a[key], b[key])) return false;
      }
      return true;
    }

    return false;
  }

  toString(): string {
    return JSON.stringify(this._value);
  }
}