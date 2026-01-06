# @damarkuncoro/agnostic-ui-contract-core

Core contract utilities and base types for the Agnostic UI ecosystem. This package provides the foundational building blocks that all component contracts use to ensure consistency, type safety, and proper validation across the entire system.

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

- **Base Types**: Fundamental interfaces for contracts, properties, and validation
- **Standard Variants**: Common size, intent, tone, and emphasis variants
- **Accessibility Support**: ARIA roles and keyboard action constants
- **Utility Functions**: Helpers for creating and validating contracts
- **Validation Logic**: Property and contract validation utilities

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

### From Manual Contract Creation

```typescript
// Before (manual)
const contract = {
  name: 'button',
  displayName: 'Button',
  category: 'form',
  // ... manual definition
};

// After (using core utilities)
import { createContract, uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

const contract = createContract({
  name: 'button',
  displayName: 'Button',
  category: 'form',
  propsSchema: {
    size: { type: 'string', enum: uiSizes },
    intent: { type: 'string', enum: uiIntents }
  }
  // ... rest filled with defaults
});
```

## Related Packages

- **@damarkuncoro/agnostic-ui-contract-registry**: Contract registry and management
- **@damarkuncoro/agnostic-ui-ast**: AST types and validation
- **@damarkuncoro/agnostic-ui-exporters**: Framework-specific exporters

## Contributing

When adding new utilities to the core:

1. Ensure backward compatibility
2. Add comprehensive TypeScript types
3. Include JSDoc documentation
4. Add unit tests
5. Update this README

## License

MIT © [Damar Kuncoro](https://github.com/damarkuncoro)