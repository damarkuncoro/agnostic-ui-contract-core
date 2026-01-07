# @damarkuncoro/agnostic-ui-contract-core

**🏛️ Domain-Driven Design (DDD) Architecture** - Core contract utilities and base types for the Agnostic UI ecosystem. This package provides the foundational building blocks that all component contracts use to ensure consistency, type safety, and proper validation across the entire system.

## 🏗️ Architecture Overview

This package has been refactored to follow **Domain-Driven Design (DDD)** principles with clean architecture:

```
📦 @damarkuncoro/agnostic-ui-contract-core
├── 🏛️ Domain Layer (DDD)
│   ├── Entities: Variant, ContractName
│   ├── Value Objects: VariantType, ContractName
│   ├── Domain Services: VariantFactory
│   └── Domain Events: ContractCreatedEvent
├── 🏢 Application Layer
│   └── Use Cases: CreateVariantUseCase
├── 🛠️ Infrastructure Layer
│   └── Repositories: VariantRepository
└── 🔄 Legacy Compatibility Layer
    └── Backward-compatible APIs
```

### Key Benefits of DDD Architecture

- ✅ **SOLID Principles**: Single responsibility, dependency injection, interface segregation
- ✅ **DRY Principle**: Eliminated code duplication, centralized business logic
- ✅ **Clean Architecture**: Clear separation between domain, application, and infrastructure
- ✅ **Testability**: Dependency injection enables comprehensive unit testing
- ✅ **Maintainability**: Organized code structure that's easy to extend
- ✅ **Backward Compatibility**: Legacy APIs remain functional during transition

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-contract-core
# or
pnpm add @damarkuncoro/agnostic-ui-contract-core
# or
yarn add @damarkuncoro/agnostic-ui-contract-core
```

## Overview

The contract core provides:

### 🏛️ **DDD Architecture (New)**
- **Domain Entities**: `Contract`, `Variant`, `ContractName` with business logic
- **Value Objects**: Immutable objects with validation (`ContractName`, `VariantType`)
- **Domain Services**: Business logic coordination (`IContractValidator`)
- **Use Cases**: Application orchestration (`CreateContractUseCase`)
- **Infrastructure**: Schema validation (`SchemaContractValidator`)
- **Domain Events**: Business event notifications (`ContractCreatedEvent`, `ContractValidatedEvent`)
- **Dependency Injection**: Clean service container with singleton pattern

### 🔄 **Legacy Compatibility (Maintained)**
- **Base Types**: Fundamental interfaces for contracts, properties, and validation
- **Standard Variants**: Common size, intent, tone, and emphasis variants
- **Accessibility Support**: ARIA roles and keyboard action constants
- **Utility Functions**: Helpers for creating and validating contracts
- **Validation Logic**: Property and contract validation utilities

## 🏛️ Domain-Driven Design APIs

### Domain Entities

```typescript
import { Variant, VariantType } from '@damarkuncoro/agnostic-ui-contract-core';

// Create a variant using domain entity
const sizeVariant = Variant.create(VariantType.SIZE, ['xs', 'sm', 'md', 'lg', 'xl']);

// Business logic methods
console.log(sizeVariant.hasValue('md')); // true
console.log(sizeVariant.getValues());    // ['xs', 'sm', 'md', 'lg', 'xl']
```

### Value Objects

```typescript
import { ContractName, VariantType } from '@damarkuncoro/agnostic-ui-contract-core';

// Immutable value objects with validation
const contractName = ContractName.create('my-button-component');
const variantType = VariantType.create('SIZE');

// Type-safe and validated
console.log(contractName.value); // 'my-button-component'
console.log(variantType.value);  // 'SIZE'
```

### Domain Services

```typescript
import { VariantFactory } from '@damarkuncoro/agnostic-ui-contract-core';

// Centralized variant creation logic
const factory = new VariantFactory();
const standardVariants = factory.createStandardVariants();

console.log(standardVariants.get(VariantType.SIZE));
// Variant { type: VariantType { value: 'SIZE' }, values: ['xs', 'sm', 'md', 'lg', 'xl'] }
```

### Use Cases

```typescript
import { CreateVariantUseCaseImpl } from '@damarkuncoro/agnostic-ui-contract-core';

// Application layer orchestration
const useCase = new CreateVariantUseCaseImpl(variantFactory);

const result = await useCase.createVariant({
  type: 'SIZE',
  values: ['sm', 'md', 'lg']
});

console.log(result.variant); // Created Variant entity
```

### Dependency Injection

```typescript
import { getContractCoreService } from '@damarkuncoro/agnostic-ui-contract-core';

// Service locator pattern
const variantFactory = getContractCoreService<VariantFactory>('IVariantFactory');
const repository = getContractCoreService<VariantRepository>('IVariantRepository');
```

## 🔄 Legacy APIs (Backward Compatible)

## Core Types

### Contract Definition

```typescript
import type { ContractDefinition } from '@damarkuncoro/agnostic-ui-contract-core';

interface ContractDefinition {
  name: string;                    // Unique identifier
  displayName: string;             // Human-readable name
  category: ContractCategory;      // Component category
  propsSchema: Record<string, PropSchema>;  // Property definitions
  variants: Record<string, string[]>;       // Available variants
  events: string[];                // Supported events
  accessibility: AccessibilityRules;        // A11y requirements
  children?: ChildrenRules;        // Child constraints
  version?: string;                // Contract version
}
```

### Property Schema

```typescript
interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required?: boolean;
  default?: any;
  enum?: string[];
  description?: string;
  validation?: Record<string, any>;
}
```

## Standard Variants

### Sizes
```typescript
import { uiSizes } from '@damarkuncoro/agnostic-ui-contract-core';

console.log(uiSizes); // ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
```

### Intents
```typescript
import { uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

console.log(uiIntents);
// ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral']
```

### Tones
```typescript
import { uiTones } from '@damarkuncoro/agnostic-ui-contract-core';

console.log(uiTones); // ['subtle', 'normal', 'strong']
```

### Emphasis Levels
```typescript
import { uiEmphases } from '@damarkuncoro/agnostic-ui-contract-core';

console.log(uiEmphases); // ['low', 'medium', 'high']
```

## Accessibility Support

### ARIA Roles
```typescript
import { uiA11yRoles } from '@damarkuncoro/agnostic-ui-contract-core';

console.log(uiA11yRoles);
// ['button', 'checkbox', 'dialog', 'textbox', ...]
```

### Keyboard Actions
```typescript
import { uiA11yKeyboardActions } from '@damarkuncoro/agnostic-ui-contract-core';

console.log(uiA11yKeyboardActions);
// ['Enter', 'Space', 'Escape', 'ArrowUp', 'ArrowDown', ...]
```

## Utility Functions

### Creating Property Schemas

```typescript
import { createPropSchema } from '@damarkuncoro/agnostic-ui-contract-core';

const sizeProp = createPropSchema({
  type: 'string',
  enum: ['sm', 'md', 'lg'],
  default: 'md',
  description: 'Component size variant'
});
```

### Creating Accessibility Rules

```typescript
import { createA11yRules } from '@damarkuncoro/agnostic-ui-contract-core';

const buttonA11y = createA11yRules({
  role: 'button',
  keyboard: ['Enter', 'Space'],
  focusable: true
});
```

### Creating Children Rules

```typescript
import { createChildrenRules } from '@damarkuncoro/agnostic-ui-contract-core';

const containerChildren = createChildrenRules({
  allowed: ['button', 'text', 'icon'],
  min: 0,
  max: 10
});
```

## Contract Creation

### Using the Contract Builder

```typescript
import {
  createContract,
  uiSizes,
  uiIntents
} from '@damarkuncoro/agnostic-ui-contract-core';

const buttonContract = createContract({
  name: 'button',
  displayName: 'Button',
  category: 'form',
  propsSchema: {
    variant: {
      type: 'string',
      enum: uiIntents,
      default: 'primary'
    },
    size: {
      type: 'string',
      enum: uiSizes.slice(0, 5), // xs, sm, md, lg, xl
      default: 'md'
    },
    disabled: {
      type: 'boolean',
      default: false
    }
  },
  variants: {
    variants: uiIntents,
    sizes: uiSizes.slice(0, 5)
  },
  events: ['onClick', 'onFocus', 'onBlur'],
  accessibility: {
    role: 'button',
    keyboard: ['Enter', 'Space']
  }
});
```

## Validation

### Property Validation

```typescript
import { validatePropValue } from '@damarkuncoro/agnostic-ui-contract-core';

const schema = { type: 'string', enum: ['sm', 'md', 'lg'] };

validatePropValue('md', schema);     // true
validatePropValue('xl', schema);     // false (not in enum)
validatePropValue(123, schema);      // false (wrong type)
```

### Contract Validation

```typescript
import { validateContract } from '@damarkuncoro/agnostic-ui-contract-core';

const result = validateContract(buttonContract);

if (!result.valid) {
  console.error('Contract validation errors:', result.errors);
}
```

## Contract Categories

The core defines these standard categories:

- **`layout`**: Container and positioning (box, flex, grid)
- **`form`**: User input components (input, button, select)
- **`navigation`**: Navigation elements (link, menu, tabs)
- **`feedback`**: Status and messaging (alert, modal, toast)
- **`data`**: Data display (table, list, card, chart)
- **`media`**: Rich content (image, icon, video, audio)
- **`utility`**: Helper components (spacer, divider, portal)

## Best Practices

### 1. Use Standard Variants
```typescript
// ✅ Good: Use standard variants
propsSchema: {
  size: { type: 'string', enum: uiSizes },
  intent: { type: 'string', enum: uiIntents }
}

// ❌ Avoid: Custom variants without good reason
propsSchema: {
  size: { type: 'string', enum: ['tiny', 'huge'] }
}
```

### 2. Include Accessibility
```typescript
// ✅ Good: Define accessibility requirements
accessibility: {
  role: 'button',
  keyboard: ['Enter', 'Space'],
  label: true
}
```

### 3. Validate Contracts
```typescript
// Always validate contracts during development
const { valid, errors } = validateContract(myContract);
if (!valid) {
  throw new Error(`Invalid contract: ${errors.join(', ')}`);
}
```

### 4. Use Utility Functions
```typescript
// ✅ Good: Use helper functions
const prop = createPropSchema({
  type: 'string',
  required: true,
  description: 'Button label'
});

// ❌ Avoid: Manual object creation
const prop = {
  type: 'string' as const,
  required: true,
  description: 'Button label'
};
```

## Integration with Contract Registry

The contract core works seamlessly with the contract registry:

```typescript
import { createContract } from '@damarkuncoro/agnostic-ui-contract-core';
import { CONTRACT_REGISTRY } from '@damarkuncoro/agnostic-ui-contract-registry';

// Create contract using core utilities
const myContract = createContract({
  name: 'my-component',
  displayName: 'My Component',
  category: 'utility',
  // ... contract definition
});

// Register the contract
CONTRACT_REGISTRY['my-component'] = myContract;
```

## Migration Guide

### 🆕 New DDD Approach (Recommended)

For new development, use the DDD architecture:

```typescript
import {
  Variant,
  VariantType,
  VariantFactory,
  CreateVariantUseCaseImpl
} from '@damarkuncoro/agnostic-ui-contract-core';

// 1. Use domain entities
const sizeVariant = Variant.create(VariantType.SIZE, ['xs', 'sm', 'md', 'lg', 'xl']);

// 2. Use domain services
const factory = new VariantFactory();
const variants = factory.createStandardVariants();

// 3. Use use cases for complex operations
const useCase = new CreateVariantUseCaseImpl(factory);
const result = await useCase.createVariant({
  type: 'INTENT',
  values: ['primary', 'secondary', 'success']
});
```

### 🔄 Legacy Compatibility (Maintained)

Existing code continues to work unchanged:

```typescript
// Legacy approach (still supported)
import { createContract, uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

const contract = createContract({
  name: 'button',
  displayName: 'Button',
  category: 'form',
  propsSchema: {
    size: { type: 'string', enum: uiSizes },
    intent: { type: 'string', enum: uiIntents }
  }
});
```

### Migration Benefits

| Aspect | Legacy Approach | DDD Approach |
|--------|----------------|--------------|
| **Testability** | Limited | High (dependency injection) |
| **Maintainability** | Moderate | High (clear boundaries) |
| **Extensibility** | Limited | High (interface-based) |
| **Type Safety** | Good | Excellent (domain validation) |
| **Code Organization** | Functional | Architectural layers |
| **Business Logic** | Scattered | Centralized in domain |
| **Dependencies** | Tight coupling | Loose coupling |

### Gradual Migration Strategy

1. **Phase 1**: Continue using legacy APIs for existing code
2. **Phase 2**: Use DDD APIs for new features
3. **Phase 3**: Gradually migrate existing code to DDD
4. **Phase 4**: Deprecate legacy APIs (future release)

### When to Use Each Approach

#### Use DDD APIs when:
- Building new features or components
- Complex business logic is required
- High testability is needed
- Long-term maintainability is critical
- Working in large teams

#### Use Legacy APIs when:
- Quick prototyping or simple use cases
- Maintaining existing code
- Simple property validation
- Minimal business logic requirements

## Related Packages

### DDD Architecture Packages
- **@damarkuncoro/agnostic-ui-ast**: AST manipulation with DDD (completed)
- **@damarkuncoro/agnostic-ui-contract-core**: Contract definitions with DDD (completed)

### Legacy Architecture Packages
- **@damarkuncoro/agnostic-ui-contract-registry**: Contract registry and management
- **@damarkuncoro/agnostic-ui-exporters**: Framework-specific exporters

## Contributing

### For DDD Architecture (New Code)

When adding new domain logic:

1. **Domain Layer**: Place business logic in appropriate domain entities/services
2. **Value Objects**: Use immutable value objects for data validation
3. **Dependency Injection**: Register services in bootstrap container
4. **Interface Segregation**: Define specific interfaces for client needs
5. **Domain Events**: Publish events for important business state changes
6. **Comprehensive Testing**: Unit tests for domain logic, integration tests for use cases

```typescript
// Example: Adding new domain entity
export class NewEntity extends BaseEntity {
  constructor(
    id: EntityId,
    private readonly _name: EntityName,
    private readonly _properties: Property[]
  ) {
    super(id);
    this.validateBusinessRules();
  }

  // Business methods
  updateName(newName: EntityName): void {
    // Domain logic here
    this.addDomainEvent(new EntityNameChangedEvent(this.id, newName));
  }
}
```

### For Legacy Compatibility (Existing Code)

When maintaining legacy APIs:

1. **Backward Compatibility**: Ensure existing APIs remain functional
2. **Deprecation Warnings**: Mark legacy functions as deprecated
3. **Migration Path**: Provide clear upgrade guides
4. **Type Safety**: Maintain full TypeScript compatibility

### General Guidelines

1. **SOLID Principles**: Follow all five SOLID principles
2. **DRY Principle**: Eliminate code duplication
3. **Clean Architecture**: Maintain layer separation
4. **Comprehensive Documentation**: Update README and inline docs
5. **Test Coverage**: Maintain high test coverage for all code
6. **Type Safety**: Full TypeScript with strict typing

## Architecture Evolution

### DDD Refactoring Timeline
- **Initial Release**: Legacy functional architecture
- **DDD Refactoring**: January 2026 - Complete domain-driven redesign
- **Migration Period**: Gradual adoption of DDD APIs (ongoing)
- **Legacy Support**: Maintained until next major version

### Architecture Benefits Achieved
- ✅ **SOLID Principles**: All five principles implemented
- ✅ **DRY Principle**: Code duplication eliminated
- ✅ **Clean Architecture**: Clear layer separation
- ✅ **Domain-Driven Design**: Business logic properly encapsulated
- ✅ **Testability**: Dependency injection enables comprehensive testing
- ✅ **Maintainability**: Organized structure for long-term development
- ✅ **Backward Compatibility**: Legacy APIs remain functional

## License

MIT © [Damar Kuncoro](https://github.com/damarkuncoro)

**DDD Refactoring Completed**: January 2026