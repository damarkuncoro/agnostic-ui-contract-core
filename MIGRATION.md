# 🔄 Migration Guide

## 🚨 **IMMEDIATE MIGRATION REQUIRED**

**⚠️ DEPRECATED WARNING**: Legacy APIs are DEPRECATED and will be removed in the next major version. **Start migrating NOW** to avoid breaking changes.

## 🆕 **DDD Approach (REQUIRED for New Code)**

For ALL new development, use the complete DDD architecture:

```typescript
import {
  Variant,
  VariantType,
  VariantFactory,
  CreateVariantUseCaseImpl,
  Contract,
  ContractName
} from '@damarkuncoro/agnostic-ui-contract-core';

// 1. Use domain entities with proper inheritance
const sizeVariant = Variant.create(VariantType.SIZE, ['xs', 'sm', 'md', 'lg', 'xl']);
console.log(sizeVariant.id); // Access BaseEntity properties
console.log(sizeVariant.createdAt); // Entity lifecycle tracking

// 2. Use domain services for business logic
const factory = new VariantFactory();
const variants = factory.createStandardVariants();

// 3. Use use cases for complex operations
const useCase = new CreateVariantUseCaseImpl(factory);
const result = await useCase.createVariant({
  type: VariantType.INTENT,
  values: ['primary', 'secondary', 'success']
});

// 4. Create contracts using domain entities
const contractName = ContractName.create('my-button-component');
const contract = Contract.create({
  name: contractName.value,
  category: 'component',
  variants: [sizeVariant],
  props: [],
  accessibility: { supported: true, roles: ['button'] }
});
```

## 🔄 **Legacy Compatibility (DEPRECATED - DO NOT USE)**

**⚠️ WARNING**: These APIs are DEPRECATED. Existing code should be migrated immediately.

```typescript
// DEPRECATED - DO NOT USE IN NEW CODE
import { createContract, uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

const contract = createContract({ // DEPRECATED
  name: 'button',
  displayName: 'Button',
  category: 'form',
  propsSchema: {
    size: { type: 'string', enum: uiSizes }, // DEPRECATED
    intent: { type: 'string', enum: uiIntents } // DEPRECATED
  }
});
```

## 📊 Migration Benefits Comparison

| Aspect | Legacy Approach | DDD Approach |
|--------|----------------|--------------|
| **Testability** | Limited | ✅ High (dependency injection) |
| **Maintainability** | Moderate | ✅ High (clear boundaries) |
| **Extensibility** | Limited | ✅ High (interface-based) |
| **Type Safety** | Good | ✅ Excellent (domain validation) |
| **Code Organization** | Functional | ✅ Architectural layers |
| **Business Logic** | Scattered | ✅ Centralized in domain |
| **Dependencies** | Tight coupling | ✅ Loose coupling |
| **Entity Consistency** | ❌ Inconsistent | ✅ **FIXED**: All entities extend BaseEntity |
| **Educational Value** | None | ✅ "Why It Matters" documentation |
| **Strategic Positioning** | Basic | ✅ Enterprise foundation |

## 🗓️ **URGENT Migration Strategy**

### **Phase 1 (Immediate)**: Stop using legacy APIs in new code
### **Phase 2 (This Sprint)**: Migrate existing simple components to DDD
### **Phase 3 (Next Sprint)**: Migrate complex components with business logic
### **Phase 4 (Future Release)**: Legacy APIs removed entirely

## 🎯 **When to Use Each Approach**

### ✅ **REQUIRED: Use DDD APIs for:**
- ALL new features or components
- Complex business logic requirements
- High testability needs
- Long-term maintainability requirements
- Large team collaboration
- Enterprise-scale applications

### ⚠️ **DEPRECATED: Legacy APIs only for:**
- **Temporary** maintenance of existing code
- **Immediate** migration planning
- **DO NOT** use in any new development

## 🔧 **Migration Examples**

### **Before: Legacy Contract Creation**
```typescript
// DEPRECATED - DO NOT USE
import { createContract, uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

const buttonContract = createContract({
  name: 'button',
  displayName: 'Button',
  category: 'form',
  propsSchema: {
    size: { type: 'string', enum: uiSizes },
    intent: { type: 'string', enum: uiIntents }
  },
  variants: {
    sizes: uiSizes,
    intents: uiIntents
  }
});
```

### **After: DDD Contract Creation**
```typescript
import {
  Contract,
  ContractName,
  Variant,
  VariantType,
  VariantFactory
} from '@damarkuncoro/agnostic-ui-contract-core';

// 1. Create domain entities
const contractName = ContractName.create('button');
const variantFactory = new VariantFactory();

// 2. Create variants using domain services
const sizeVariant = Variant.create(VariantType.SIZE, ['xs', 'sm', 'md', 'lg', 'xl']);
const intentVariant = Variant.create(VariantType.INTENT, ['primary', 'secondary', 'success']);

// 3. Create contract using domain entity
const buttonContract = Contract.create({
  name: contractName.value,
  category: 'form',
  variants: [sizeVariant, intentVariant],
  props: [
    { name: 'size', type: 'string', enum: sizeVariant.values, required: false, default: 'md' },
    { name: 'intent', type: 'string', enum: intentVariant.values, required: false, default: 'primary' }
  ],
  accessibility: {
    supported: true,
    roles: ['button'],
    keyboard: ['Enter', 'Space']
  }
});
```

### **Before: Legacy Validation**
```typescript
// DEPRECATED - Manual validation
function validateButtonProps(props: any): boolean {
  const validSizes = ['sm', 'md', 'lg'];
  const validIntents = ['primary', 'secondary'];

  return validSizes.includes(props.size) && validIntents.includes(props.intent);
}
```

### **After: DDD Validation with DRY/SOLID**
```typescript
import {
  validateInSet,
  combineValidationResults,
  COMMON_VARIANTS
} from '@damarkuncoro/agnostic-ui-contract-core';

function validateButtonProps(props: any): ValidationResult {
  const sizeValidation = validateInSet(props.size, COMMON_VARIANTS.sizes, 'size');
  const intentValidation = validateInSet(props.intent, COMMON_VARIANTS.intents, 'intent');

  return combineValidationResults([sizeValidation, intentValidation]);
}
```

### **Before: Legacy Factory**
```typescript
// DEPRECATED - Manual factory
class ButtonFactory {
  create(config: any) {
    if (!config.name) throw new Error('Name required');
    return new Button(config);
  }
}
```

### **After: SOLID Factory Pattern**
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

  validateConfig(config: ButtonConfig): ValidationResult {
    return validateInSet(config.size, COMMON_VARIANTS.sizes, 'size');
  }
}
```

## 🧪 **Testing Migration**

### **Before: Legacy Testing**
```typescript
// Hard to test, tight coupling
describe('Legacy Button', () => {
  it('should create button', () => {
    const button = createButton({ size: 'md' });
    expect(button.size).toBe('md');
  });
});
```

### **After: DDD Testing**
```typescript
// Easy to test with dependency injection
describe('ButtonFactory', () => {
  let factory: ButtonFactory;

  beforeEach(() => {
    factory = new ButtonFactory();
  });

  it('should create valid button', () => {
    const button = factory.create({ size: 'md', intent: 'primary' });
    expect(button.size).toBe('md');
    expect(button.intent).toBe('primary');
  });

  it('should reject invalid size', () => {
    expect(() => {
      factory.create({ size: 'invalid', intent: 'primary' });
    }).toThrow();
  });
});
```

## 🔍 **Migration Checklist**

### **Phase 1: Assessment**
- [ ] Identify all legacy API usage in codebase
- [ ] Create migration plan with priorities
- [ ] Set up DDD testing infrastructure
- [ ] Train team on DDD patterns

### **Phase 2: Core Migration**
- [ ] Replace `createContract` with `Contract.create`
- [ ] Replace manual validation with DRY utilities
- [ ] Replace manual factories with `BaseFactory` inheritance
- [ ] Update all imports to use DDD exports

### **Phase 3: Advanced Patterns**
- [ ] Implement domain services for complex business logic
- [ ] Add domain events for important state changes
- [ ] Create use cases for complex operations
- [ ] Implement proper dependency injection

### **Phase 4: Cleanup**
- [ ] Remove all legacy API imports
- [ ] Update documentation to DDD-only
- [ ] Run comprehensive test suite
- [ ] Deploy with confidence

## 🚨 **Breaking Changes in Next Version**

When legacy APIs are removed, the following will break:

1. **`createContract` function** → Use `Contract.create`
2. **`uiSizes`, `uiIntents` constants** → Use `COMMON_VARIANTS`
3. **Manual validation functions** → Use DRY validation utilities
4. **Manual factory classes** → Extend `BaseFactory`
5. **Legacy contract schemas** → Use domain entities

## 📞 **Migration Support**

### **Resources Available:**
- ✅ **Complete API Documentation**: See [API.md](API.md)
- ✅ **Working Examples**: See generated demos in `apps/ddd-demo/`
- ✅ **Migration Examples**: This guide with before/after code
- ✅ **DDD Architecture Guide**: See [ARCHITECTURE.md](ARCHITECTURE.md)

### **Getting Help:**
1. **Check API Documentation**: [API.md](API.md) has examples for everything
2. **Run Generated Demos**: `cd apps/ddd-demo && npx tsx src/main.ts`
3. **Review Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md) explains patterns
4. **Ask Questions**: Create issues with migration questions

### **Success Metrics:**
- ✅ All new code uses DDD patterns
- ✅ Legacy API usage eliminated
- ✅ Test coverage maintained or improved
- ✅ Type safety enhanced
- ✅ Code maintainability improved

## 🎯 **Final Migration Goal**

**Transform your codebase from:**
```typescript
// Legacy: Functional, tightly coupled, hard to test
import { createContract, uiSizes } from '@damarkuncoro/agnostic-ui-contract-core';
const contract = createContract({ propsSchema: { size: { enum: uiSizes } } });
```

**To:**
```typescript
// DDD: Architectural, loosely coupled, easily testable
import { Contract, Variant, VariantType } from '@damarkuncoro/agnostic-ui-contract-core';
const sizeVariant = Variant.create(VariantType.SIZE, ['xs', 'sm', 'md', 'lg', 'xl']);
const contract = Contract.create({ variants: [sizeVariant] });
```

**The result: Enterprise-grade, maintainable, scalable UI architecture!** 🚀

---

## 📄 License

MIT © [Damar Kuncoro](https://github.com/damarkuncoro)