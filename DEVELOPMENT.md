# 🛠️ Development Guide

This guide shows how to create a new contract package following the established DDD patterns, from initial setup to publishing.

## 📋 Table of Contents

- [Project Structure Setup](#project-structure-setup)
- [Package Configuration](#package-configuration)
- [Domain Layer Implementation](#domain-layer-implementation)
- [Application Layer Implementation](#application-layer-implementation)
- [Infrastructure Layer Implementation](#infrastructure-layer-implementation)
- [Bootstrap Configuration](#bootstrap-configuration)
- [Main Exports](#main-exports)
- [TypeScript Configuration](#typescript-configuration)
- [Testing Setup](#testing-setup)
- [Build and Publish](#build-and-publish)
- [Integration with Core](#integration-with-core)
- [Usage Example](#usage-example)

## 📁 Project Structure Setup

Create the package structure following DDD architectural layers:

```
contract-packages/
└── agnostic-ui-contract-button/
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    ├── src/
    │   ├── index.ts
    │   ├── bootstrap.ts
    │   ├── domain/
    │   │   ├── contract/
    │   │   │   ├── entities/
    │   │   │   │   └── ButtonContract.ts
    │   │   │   ├── services/
    │   │   │   │   └── IButtonValidator.ts
    │   │   │   └── value-objects/
    │   │   │       └── ButtonVariant.ts
    │   │   └── shared/
    │   │       ├── BaseEntity.ts (reuse from core)
    │   │       ├── ValueObject.ts (reuse from core)
    │   │       └── events/
    │   │           └── ButtonEvents.ts
    │   ├── application/
    │   │   └── use-cases/
    │   │       └── CreateButtonContractUseCase.ts
    │   ├── infrastructure/
    │   │   ├── factories/
    │   │   │   └── ButtonContractFactory.ts
    │   │   ├── repositories/
    │   │   │   └── ButtonContractRepository.ts
    │   │   └── validators/
    │   │       └── ButtonContractValidator.ts
    │   └── types.ts
    └── lib/
        └── (compiled output)
```

## 📦 Package Configuration

Create `package.json` with proper dependencies and scripts:

```json
{
  "name": "@damarkuncoro/agnostic-ui-contract-button",
  "version": "0.1.0",
  "description": "Button component contracts extending @damarkuncoro/agnostic-ui-contract-core",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "exports": {
    ".": {
      "types": "./lib/index.d.ts",
      "default": "./lib/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint src --ext .ts",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@damarkuncoro/agnostic-ui-contract-core": "file:../../packages/agnostic-ui-contract-core"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^2.1.9",
    "@types/node": "^20.0.0"
  },
  "peerDependencies": {
    "@damarkuncoro/agnostic-ui-contract-core": "*"
  }
}
```

## 🏛️ Domain Layer Implementation

### Create Domain Entity

```typescript
// src/domain/contract/entities/ButtonContract.ts
import { BaseEntity } from '@damarkuncoro/agnostic-ui-contract-core';
import { ContractName } from '@damarkuncoro/agnostic-ui-contract-core';
import { ButtonVariant } from '../value-objects/ButtonVariant';
import { ButtonPressedEvent } from '../../shared/events/ButtonEvents';

export class ButtonContract extends BaseEntity {
  constructor(
    id: string,
    private readonly _name: ContractName,
    private readonly _variants: ButtonVariant[],
    private readonly _props: ButtonProp[]
  ) {
    super(id);
  }

  static create(params: {
    id?: string;
    name: string;
    variants?: ButtonVariant[];
    props?: ButtonProp[];
  }): ButtonContract {
    const contract = new ButtonContract(
      params.id || crypto.randomUUID(),
      ContractName.create(params.name),
      params.variants || [],
      params.props || []
    );

    // Domain event
    contract.addDomainEvent(new ButtonContractCreatedEvent(params.name));

    return contract;
  }

  // Business methods
  addVariant(variant: ButtonVariant): void {
    if (this._variants.some(v => v.equals(variant))) {
      throw new Error('Variant already exists');
    }
    this._variants.push(variant);
    this.markAsModified();
  }

  // Getters
  get name(): ContractName { return this._name; }
  get variants(): readonly ButtonVariant[] { return [...this._variants]; }
}
```

### Create Value Objects

```typescript
// src/domain/contract/value-objects/ButtonVariant.ts
import { ValueObject } from '@damarkuncoro/agnostic-ui-contract-core';

export class ButtonVariant extends ValueObject<ButtonVariantData> {
  private constructor(private readonly _data: ButtonVariantData) {
    super(_data);
  }

  static create(type: string, values: string[]): ButtonVariant {
    return new ButtonVariant({ type, values });
  }

  get type(): string { return this._data.type; }
  get values(): readonly string[] { return [...this._data.values]; }
}

interface ButtonVariantData {
  type: string;
  values: string[];
}
```

### Create Domain Events

```typescript
// src/domain/shared/events/ButtonEvents.ts
export class ButtonContractCreatedEvent {
  constructor(
    public readonly contractName: string,
    public readonly timestamp: Date = new Date()
  ) {}
}

export class ButtonPressedEvent {
  constructor(
    public readonly buttonId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
```

## 🏢 Application Layer Implementation

### Create Use Case

```typescript
// src/application/use-cases/CreateButtonContractUseCase.ts
import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { IButtonContractFactory } from '../../domain/contract/services/IButtonContractFactory';

export interface CreateButtonContractRequest {
  name: string;
  variants?: string[];
  props?: ButtonProp[];
}

export interface CreateButtonContractResponse {
  contract: ButtonContract;
  success: boolean;
  message: string;
}

export class CreateButtonContractUseCase {
  constructor(
    private readonly contractFactory: IButtonContractFactory
  ) {}

  async execute(request: CreateButtonContractRequest): Promise<CreateButtonContractResponse> {
    try {
      const contract = this.contractFactory.createContract(request);
      return {
        contract,
        success: true,
        message: `Button contract '${request.name}' created successfully`
      };
    } catch (error) {
      return {
        contract: null as any,
        success: false,
        message: `Failed to create button contract: ${error.message}`
      };
    }
  }
}
```

## 🛠️ Infrastructure Layer Implementation

### Create Repository

```typescript
// src/infrastructure/repositories/ButtonContractRepository.ts
import { ButtonContract } from '../../domain/contract/entities/ButtonContract';

export interface IButtonContractRepository {
  save(contract: ButtonContract): Promise<void>;
  findByName(name: string): Promise<ButtonContract | null>;
  findAll(): Promise<ButtonContract[]>;
}

export class InMemoryButtonContractRepository implements IButtonContractRepository {
  private contracts = new Map<string, ButtonContract>();

  async save(contract: ButtonContract): Promise<void> {
    this.contracts.set(contract.name.value, contract);
  }

  async findByName(name: string): Promise<ButtonContract | null> {
    return this.contracts.get(name) || null;
  }

  async findAll(): Promise<ButtonContract[]> {
    return Array.from(this.contracts.values());
  }
}
```

### Create Factory

```typescript
// src/infrastructure/factories/ButtonContractFactory.ts
import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { IButtonContractFactory } from '../../domain/contract/services/IButtonContractFactory';

export class ButtonContractFactory implements IButtonContractFactory {
  createContract(params: CreateButtonContractRequest): ButtonContract {
    return ButtonContract.create({
      name: params.name,
      variants: params.variants?.map(v => ButtonVariant.create('size', [v])) || [],
      props: params.props || []
    });
  }

  createStandardButtonContract(name: string): ButtonContract {
    return this.createContract({
      name,
      variants: [
        ButtonVariant.create('size', ['sm', 'md', 'lg']),
        ButtonVariant.create('intent', ['primary', 'secondary', 'success'])
      ],
      props: [
        { name: 'disabled', type: 'boolean', required: false, default: false },
        { name: 'loading', type: 'boolean', required: false, default: false }
      ]
    });
  }
}
```

## ⚙️ Bootstrap Configuration

```typescript
// src/bootstrap.ts
import { CreateButtonContractUseCase } from './application/use-cases/CreateButtonContractUseCase';
import { ButtonContractFactory } from './infrastructure/factories/ButtonContractFactory';
import { InMemoryButtonContractRepository } from './infrastructure/repositories/ButtonContractRepository';

class ButtonContractServiceContainer {
  private static instance: ButtonContractServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): ButtonContractServiceContainer {
    if (!ButtonContractServiceContainer.instance) {
      ButtonContractServiceContainer.instance = new ButtonContractServiceContainer();
    }
    return ButtonContractServiceContainer.instance;
  }

  private initializeServices(): void {
    // Infrastructure
    const repository = new InMemoryButtonContractRepository();
    const factory = new ButtonContractFactory();

    // Application
    const createUseCase = new CreateButtonContractUseCase(factory);

    this.services.set('ButtonContractRepository', repository);
    this.services.set('ButtonContractFactory', factory);
    this.services.set('CreateButtonContractUseCase', createUseCase);
  }

  get<T>(serviceName: string): T {
    return this.services.get(serviceName);
  }
}

export const buttonContractServiceContainer = ButtonContractServiceContainer.getInstance();
export const getCreateButtonContractUseCase = () =>
  buttonContractServiceContainer.get<CreateButtonContractUseCase>('CreateButtonContractUseCase');
```

## 📤 Main Exports

```typescript
// src/index.ts
// Domain Layer
export { ButtonContract } from './domain/contract/entities/ButtonContract';
export { ButtonVariant } from './domain/contract/value-objects/ButtonVariant';

// Application Layer
export { CreateButtonContractUseCase } from './application/use-cases/CreateButtonContractUseCase';

// Infrastructure Layer
export { InMemoryButtonContractRepository, ButtonContractFactory } from './infrastructure/repositories/ButtonContractRepository';

// Dependency Injection
export { getCreateButtonContractUseCase } from './bootstrap';

// Legacy compatibility (if needed)
export const buttonSizes = ['sm', 'md', 'lg'] as const;
export const buttonIntents = ['primary', 'secondary', 'success'] as const;
```

## ⚙️ TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./lib",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["lib", "node_modules"]
}
```

## 🧪 Testing Setup

Create test files following DDD patterns:

```typescript
// src/domain/contract/entities/ButtonContract.test.ts
import { describe, it, expect } from 'vitest';
import { ButtonContract } from '../entities/ButtonContract';
import { ContractName } from '@damarkuncoro/agnostic-ui-contract-core';

describe('ButtonContract', () => {
  it('should create a button contract', () => {
    const contract = ButtonContract.create({
      name: 'my-button',
      variants: [],
      props: []
    });

    expect(contract.name.value).toBe('my-button');
    expect(contract.id).toBeDefined();
    expect(contract.createdAt).toBeInstanceOf(Date);
  });

  it('should add variants', () => {
    const contract = ButtonContract.create({
      name: 'my-button'
    });

    const variant = ButtonVariant.create('size', ['sm', 'md', 'lg']);
    contract.addVariant(variant);

    expect(contract.variants).toContain(variant);
  });
});
```

## 🚀 Build and Publish

```bash
# Build the package
npm run build

# Test the package
npm test

# Publish to npm
npm publish

# Or for monorepo, add to workspace
pnpm publish
```

## 🔗 Integration with Core

Update the core package's build configuration to include the new contract:

```javascript
// build.config.js
module.exports = {
  packages: [
    'packages/agnostic-ui-contract-core',
    'contract-packages/agnostic-ui-contract-button',
    // ... other packages
  ]
};
```

## 💡 Usage Example

```typescript
import { ButtonContract } from '@damarkuncoro/agnostic-ui-contract-button';
import { getCreateButtonContractUseCase } from '@damarkuncoro/agnostic-ui-contract-button';

// Using DDD approach
const useCase = getCreateButtonContractUseCase();
const result = await useCase.execute({
  name: 'primary-button',
  variants: ['sm', 'md', 'lg'],
  props: [
    { name: 'disabled', type: 'boolean', default: false },
    { name: 'loading', type: 'boolean', default: false }
  ]
});

console.log('Button contract created:', result.contract.name.value);
```

## 🎯 Development Best Practices

### 1. Follow DDD Layer Separation
- **Domain Layer**: Pure business logic, no external dependencies
- **Application Layer**: Use cases that orchestrate domain objects
- **Infrastructure Layer**: External concerns (persistence, APIs, frameworks)

### 2. Use Dependency Injection
- Register services in bootstrap container
- Use interfaces for loose coupling
- Enable easy testing with mocks

### 3. Implement Comprehensive Validation
- Use DRY validation utilities from contract-core
- Validate at domain entity level
- Provide meaningful error messages

### 4. Write Domain-Driven Tests
- Test domain entities in isolation
- Use dependency injection for test doubles
- Test use cases with mocked infrastructure

### 5. Maintain Clean Architecture
- Keep domain layer pure and testable
- Isolate external dependencies in infrastructure
- Use application layer for complex orchestration

### 6. Document Business Rules
- Add comments explaining "why" business decisions
- Document domain events and their purposes
- Include examples in README

### 7. Use TypeScript Effectively
- Leverage strict TypeScript settings
- Use branded types for domain concepts
- Implement proper error handling with custom types

This guide ensures all new contract packages follow the established DDD patterns, maintain consistency with the core package, and provide a solid foundation for scalable UI component development.

## 📄 License

MIT © [Damar Kuncoro](https://github.com/damarkuncoro)