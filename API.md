# 📚 Agnostic UI Contract Core - API Documentation

## Overview

The `@damarkuncoro/agnostic-ui-contract-core` package provides the foundational utilities and patterns for building enterprise-grade UI components using **DRY (Don't Repeat Yourself)** and **SOLID** principles.

This package implements Domain-Driven Design (DDD) patterns and provides shared utilities for validation, specifications, repositories, factories, and validation strategies.

## Table of Contents

- [DRY Validation Utilities](#dry-validation-utilities)
- [SOLID Specification Pattern](#solid-specification-pattern)
- [Generic Repository Interfaces](#generic-repository-interfaces)
- [Factory Pattern Implementation](#factory-pattern-implementation)
- [Validation Strategy Pattern](#validation-strategy-pattern)
- [Value Objects](#value-objects)
- [Usage Examples](#usage-examples)
- [Migration Guide](#migration-guide)

---

## 🔄 DRY Validation Utilities

### `validateInSet(value, allowedValues, fieldName)`

Validates that a value exists in a set of allowed values.

**Parameters:**
- `value: any` - The value to validate
- `allowedValues: any[]` - Array of allowed values
- `fieldName: string` - Name of the field for error messages

**Returns:** `ValidationResult`

**Example:**
```typescript
import { validateInSet } from '@damarkuncoro/agnostic-ui-contract-core';

const result = validateInSet('primary', ['primary', 'secondary', 'danger'], 'intent');
console.log(result.isValid); // true

const invalidResult = validateInSet('invalid', ['primary', 'secondary'], 'intent');
console.log(invalidResult.isValid); // false
console.log(invalidResult.errors); // ['intent must be one of: primary, secondary']
```

### `validateAccessibility(accessibility, requiredFields)`

Validates accessibility configuration.

**Parameters:**
- `accessibility: any` - Accessibility configuration object
- `requiredFields: string[]` - Required accessibility fields

**Returns:** `ValidationResult`

**Example:**
```typescript
import { validateAccessibility } from '@damarkuncoro/agnostic-ui-contract-core';

const accessibility = {
  role: 'button',
  ariaLabel: 'Click me',
  keyboard: ['Enter', 'Space']
};

const result = validateAccessibility(accessibility, ['role', 'keyboard']);
console.log(result.isValid); // true
```

### `validateKeyboardSupport(keyboard, allowedKeys)`

Validates keyboard support configuration.

**Parameters:**
- `keyboard: string[]` - Array of keyboard keys
- `allowedKeys: string[]` - Allowed keyboard keys

**Returns:** `ValidationResult`

**Example:**
```typescript
import { validateKeyboardSupport } from '@damarkuncoro/agnostic-ui-contract-core';

const keyboard = ['Enter', 'Space', 'Escape'];
const allowedKeys = ['Enter', 'Space', 'Tab', 'Escape', 'ArrowUp', 'ArrowDown'];

const result = validateKeyboardSupport(keyboard, allowedKeys);
console.log(result.isValid); // true
```

### `combineValidationResults(results)`

Combines multiple validation results into a single result.

**Parameters:**
- `results: ValidationResult[]` - Array of validation results to combine

**Returns:** `ValidationResult`

**Example:**
```typescript
import { combineValidationResults, validateInSet } from '@damarkuncoro/agnostic-ui-contract-core';

const result1 = validateInSet('primary', ['primary', 'secondary'], 'intent');
const result2 = validateInSet('md', ['sm', 'md', 'lg'], 'size');

const combined = combineValidationResults([result1, result2]);
console.log(combined.isValid); // true
console.log(combined.errors.length); // 0
```

### `COMMON_VARIANTS`

Predefined common variant configurations.

**Type:** `Record<string, string[]>`

**Available Variants:**
```typescript
COMMON_VARIANTS = {
  sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
  intents: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
  tones: ['solid', 'soft', 'outline', 'ghost', 'link'],
  emphases: ['low', 'medium', 'high']
}
```

---

## 🎯 SOLID Specification Pattern

### `Specification<T>`

Abstract base class for specification pattern implementation.

**Methods:**
- `isSatisfiedBy(candidate: T): boolean` - Check if candidate satisfies specification
- `and(other: Specification<T>): Specification<T>` - Combine with AND logic
- `or(other: Specification<T>): Specification<T>` - Combine with OR logic
- `not(): Specification<T>` - Negate specification

### `EntityNameSpecification`

Validates entity names according to naming conventions.

**Constructor:** `new EntityNameSpecification(entityType: string)`

**Example:**
```typescript
import { EntityNameSpecification } from '@damarkuncoro/agnostic-ui-contract-core';

const spec = new EntityNameSpecification('Component');
console.log(spec.isSatisfiedBy({ name: 'my-component' })); // true
console.log(spec.isSatisfiedBy({ name: 'MyComponent' })); // false (must be lowercase)
console.log(spec.isSatisfiedBy({ name: 'my_component' })); // false (invalid characters)
```

### `ComponentSpecification`

Validates component specifications.

**Example:**
```typescript
import { ComponentSpecification } from '@damarkuncoro/agnostic-ui-contract-core';

const spec = new ComponentSpecification()
  .addSpecification(new EntityNameSpecification('Component'));

console.log(spec.isSatisfiedBy(component)); // true/false based on rules
```

---

## 🗄️ Generic Repository Interfaces

### `IRepository<T, TId>`

Generic repository interface following SOLID principles.

**Methods:**
- `findById(id: TId): Promise<T | null>` - Find entity by ID
- `findAll(): Promise<T[]>` - Find all entities
- `save(entity: T): Promise<void>` - Save entity
- `delete(id: TId): Promise<void>` - Delete entity by ID
- `exists(id: TId): Promise<boolean>` - Check if entity exists

**Example Implementation:**
```typescript
import { IRepository } from '@damarkuncoro/agnostic-ui-contract-core';

class InMemoryRepository<T extends { id: string }> implements IRepository<T, string> {
  private items = new Map<string, T>();

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) || null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async save(entity: T): Promise<void> {
    this.items.set(entity.id, entity);
  }

  async delete(id: string): Promise<void> {
    this.items.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.items.has(id);
  }
}
```

### `IRepositoryFactory<T, TId>`

Factory interface for creating repository instances.

**Methods:**
- `createRepository(): IRepository<T, TId>` - Create repository instance

---

## 🏭 Factory Pattern Implementation

### `BaseFactory<T>`

Abstract base class for factory pattern implementation.

**Methods:**
- `create(config: any): T` - Create instance with configuration
- `validateConfig(config: any): ValidationResult` - Validate configuration

**Example:**
```typescript
import { BaseFactory } from '@damarkuncoro/agnostic-ui-contract-core';

class ButtonFactory extends BaseFactory<Button> {
  create(config: ButtonConfig): Button {
    const validation = this.validateConfig(config);
    if (!validation.isValid) {
      throw new Error(`Invalid button config: ${validation.errors.join(', ')}`);
    }

    return new Button(config);
  }

  validateConfig(config: ButtonConfig): ValidationResult {
    // Use DRY validation utilities
    const nameValidation = validateInSet(config.name, ['string'], 'name');
    const sizeValidation = validateInSet(config.size, COMMON_VARIANTS.sizes, 'size');

    return combineValidationResults([nameValidation, sizeValidation]);
  }
}
```

---

## 🎭 Validation Strategy Pattern

### `ValidationStrategy`

Interface for validation strategies.

**Methods:**
- `validate(entity: any, context?: any): ValidationResult` - Validate entity

### `ValidationContext`

Context class that manages multiple validation strategies.

**Methods:**
- `addStrategy(name: string, strategy: ValidationStrategy): void` - Add validation strategy
- `validate(entity: any, strategyNames: string[]): ValidationResult` - Validate using multiple strategies

### `ValidationStrategyFactory`

Factory for creating validation strategies.

**Static Methods:**
- `createEntityValidation(): ValidationStrategy` - Create entity validation strategy
- `createComponentValidation(): ValidationStrategy` - Create component validation strategy

**Example:**
```typescript
import {
  ValidationContext,
  ValidationStrategyFactory
} from '@damarkuncoro/agnostic-ui-contract-core';

const context = new ValidationContext();

// Add validation strategies
context.addStrategy('entity', ValidationStrategyFactory.createEntityValidation());
context.addStrategy('component', ValidationStrategyFactory.createComponentValidation());

// Validate using multiple strategies
const result = context.validate(myEntity, ['entity', 'component']);
console.log(result.isValid); // true/false
```

---

## 💎 Value Objects

### `ValueObject`

Abstract base class for value objects (immutable objects).

**Methods:**
- `equals(other: ValueObject): boolean` - Check equality
- `toString(): string` - String representation

**Example:**
```typescript
import { ValueObject } from '@damarkuncoro/agnostic-ui-contract-core';

class Color extends ValueObject {
  constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number
  ) {
    super();
    this.validate();
  }

  private validate(): void {
    if (this.r < 0 || this.r > 255) throw new Error('Invalid red value');
    if (this.g < 0 || this.g > 255) throw new Error('Invalid green value');
    if (this.b < 0 || this.b > 255) throw new Error('Invalid blue value');
  }

  equals(other: ValueObject): boolean {
    if (!(other instanceof Color)) return false;
    return this.r === other.r && this.g === other.g && this.b === other.b;
  }

  toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
```

---

## 📖 Usage Examples

### Complete DRY/SOLID Implementation

```typescript
import {
  validateInSet,
  combineValidationResults,
  EntityNameSpecification,
  ComponentSpecification,
  ValidationContext,
  ValidationStrategyFactory,
  BaseFactory,
  COMMON_VARIANTS
} from '@damarkuncoro/agnostic-ui-contract-core';

// 1. DRY Validation
function validateComponentProps(props: any): ValidationResult {
  const sizeValidation = validateInSet(props.size, COMMON_VARIANTS.sizes, 'size');
  const intentValidation = validateInSet(props.intent, COMMON_VARIANTS.intents, 'intent');
  const toneValidation = validateInSet(props.tone, COMMON_VARIANTS.tones, 'tone');

  return combineValidationResults([sizeValidation, intentValidation, toneValidation]);
}

// 2. SOLID Specification Pattern
const componentSpec = new ComponentSpecification()
  .addSpecification(new EntityNameSpecification('Component'));

// 3. SOLID Strategy Pattern
const validationContext = new ValidationContext();
validationContext.addStrategy('component', ValidationStrategyFactory.createComponentValidation());

// 4. SOLID Factory Pattern
class ComponentFactory extends BaseFactory<Component> {
  create(config: ComponentConfig): Component {
    const validation = this.validateConfig(config);
    if (!validation.isValid) {
      throw new Error(`Invalid component config: ${validation.errors.join(', ')}`);
    }

    return new Component(config);
  }

  validateConfig(config: ComponentConfig): ValidationResult {
    return validateComponentProps(config);
  }
}

// Usage
const factory = new ComponentFactory();
const component = factory.create({
  name: 'my-button',
  size: 'md',
  intent: 'primary',
  tone: 'solid'
});

console.log(component); // Valid component instance
```

### Validation Pipeline

```typescript
import {
  validateInSet,
  validateAccessibility,
  validateKeyboardSupport,
  combineValidationResults
} from '@damarkuncoro/agnostic-ui-contract-core';

function validateButtonConfig(config: ButtonConfig): ValidationResult {
  // Basic property validation
  const sizeValidation = validateInSet(config.size, ['sm', 'md', 'lg'], 'size');
  const intentValidation = validateInSet(config.intent, ['primary', 'secondary'], 'intent');

  // Accessibility validation
  const accessibilityValidation = validateAccessibility(config.accessibility, ['role']);

  // Keyboard support validation
  const keyboardValidation = validateKeyboardSupport(
    config.accessibility?.keyboard || [],
    ['Enter', 'Space', 'Escape']
  );

  // Combine all validations
  return combineValidationResults([
    sizeValidation,
    intentValidation,
    accessibilityValidation,
    keyboardValidation
  ]);
}

// Usage
const config = {
  size: 'md',
  intent: 'primary',
  accessibility: {
    role: 'button',
    keyboard: ['Enter', 'Space']
  }
};

const result = validateButtonConfig(config);
if (result.isValid) {
  console.log('✅ Button config is valid');
} else {
  console.log('❌ Validation errors:', result.errors);
  console.log('⚠️ Warnings:', result.warnings);
}
```

---

## 🔄 Migration Guide

### From Manual Validation to DRY Utilities

**Before:**
```typescript
function validateSize(size: string): boolean {
  const validSizes = ['sm', 'md', 'lg', 'xl'];
  return validSizes.includes(size);
}

function validateIntent(intent: string): boolean {
  const validIntents = ['primary', 'secondary', 'success', 'danger'];
  return validIntents.includes(intent);
}
```

**After:**
```typescript
import { validateInSet, COMMON_VARIANTS } from '@damarkuncoro/agnostic-ui-contract-core';

const sizeValidation = validateInSet(size, COMMON_VARIANTS.sizes, 'size');
const intentValidation = validateInSet(intent, COMMON_VARIANTS.intents, 'intent');
```

### From Manual Specifications to SOLID Pattern

**Before:**
```typescript
function isValidComponentName(name: string): boolean {
  return /^[a-z][a-z0-9-]*$/.test(name);
}
```

**After:**
```typescript
import { EntityNameSpecification } from '@damarkuncoro/agnostic-ui-contract-core';

const spec = new EntityNameSpecification('Component');
const isValid = spec.isSatisfiedBy({ name });
```

### From Manual Factories to SOLID Pattern

**Before:**
```typescript
class ButtonFactory {
  create(config: any) {
    if (!config.name) throw new Error('Name required');
    if (!['sm', 'md', 'lg'].includes(config.size)) throw new Error('Invalid size');
    return new Button(config);
  }
}
```

**After:**
```typescript
import { BaseFactory, validateInSet, COMMON_VARIANTS } from '@damarkuncoro/agnostic-ui-contract-core';

class ButtonFactory extends BaseFactory<Button> {
  create(config: ButtonConfig): Button {
    const validation = this.validateConfig(config);
    if (!validation.isValid) {
      throw new Error(`Invalid config: ${validation.errors.join(', ')}`);
    }
    return new Button(config);
  }

  validateConfig(config: ButtonConfig) {
    return validateInSet(config.size, COMMON_VARIANTS.sizes, 'size');
  }
}
```

---

## 📋 API Reference

### Types

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface ValidationContext {
  addStrategy(name: string, strategy: ValidationStrategy): void;
  validate(entity: any, strategyNames: string[]): ValidationResult;
}
```

### Constants

```typescript
COMMON_VARIANTS: Record<string, string[]>
```

### Classes

- `Specification<T>` - Abstract specification base class
- `EntityNameSpecification` - Entity name validation
- `ComponentSpecification` - Component validation
- `BaseFactory<T>` - Abstract factory base class
- `ValidationContext` - Strategy context manager
- `ValueObject` - Immutable value object base class

### Interfaces

- `IRepository<T, TId>` - Generic repository interface
- `IRepositoryFactory<T, TId>` - Repository factory interface
- `ValidationStrategy` - Validation strategy interface

---

## 🎯 Best Practices

1. **Use DRY Utilities**: Always prefer shared validation utilities over manual validation
2. **Implement SOLID Patterns**: Use specifications, strategies, and factories for complex logic
3. **Combine Validations**: Use `combineValidationResults` to merge multiple validation results
4. **Extend Base Classes**: Inherit from `BaseFactory` and `ValueObject` for consistent behavior
5. **Use Specifications**: Implement business rules as specification classes
6. **Strategy Pattern**: Use `ValidationContext` for complex validation scenarios

---

## 📄 License

MIT © [Damar Kuncoro](https://github.com/damarkuncoro)

---

*This API documentation covers the comprehensive DRY/SOLID implementation in Agnostic UI Contract Core. For more examples, see the generated demos in `apps/ddd-demo/src/`.*