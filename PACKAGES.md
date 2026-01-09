# 📦 Complete Package Guide: Dependencies & Functions by Layer

## 🎯 **Overview**

This guide shows **exactly which packages each layer depends on** and **which functions to use** from each package. No more guessing - clear, actionable guidance for implementation.

## 🗺️ **Package Dependency Map**

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎯 APPS LAYER                                │
│  Consumer applications, Storybook, demos                       │
├─────────────────────────────────────────────────────────────────┤
│                    🧩 PROVIDER LAYER                            │
│  @damarkuncoro/agnostic-ui-provider-react                      │
│  @damarkuncoro/agnostic-ui-provider-vue                        │
│                                                                 │
│  Depends on:                                                   │
│  ├── @damarkuncoro/agnostic-ui-base-{component}               │
│  ├── @damarkuncoro/agnostic-ui-skin-tailwind                   │
│  └── @damarkuncoro/agnostic-ui-contract-{component}            │
├─────────────────────────────────────────────────────────────────┤
│                    🎨 SKIN LAYER                                │
│  @damarkuncoro/agnostic-ui-skin-tailwind                       │
│                                                                 │
│  Depends on:                                                   │
│  ├── @damarkuncoro/agnostic-ui-base-{component}               │
│  ├── @damarkuncoro/agnostic-ui-theme-{theme}                   │
│  └── @damarkuncoro/agnostic-ui-contract-{component}            │
├─────────────────────────────────────────────────────────────────┤
│                    🎭 THEME LAYER                               │
│  @damarkuncoro/agnostic-ui-theme-core                          │
│  @damarkuncoro/agnostic-ui-theme-retro                         │
│  @damarkuncoro/agnostic-ui-theme-dark                          │
│                                                                 │
│  Depends on:                                                   │
│  └── @damarkuncoro/agnostic-ui-contract-core                   │
├─────────────────────────────────────────────────────────────────┤
│                    🔧 BASE LAYER                                │
│  @damarkuncoro/agnostic-ui-base-button                         │
│  @damarkuncoro/agnostic-ui-base-input                          │
│  @damarkuncoro/agnostic-ui-base-icon                           │
│                                                                 │
│  Depends on:                                                   │
│  └── @damarkuncoro/agnostic-ui-contract-{component}            │
├─────────────────────────────────────────────────────────────────┤
│                    📋 CONTRACT LAYER                            │
│  @damarkuncoro/agnostic-ui-contract-core                       │
│  @damarkuncoro/agnostic-ui-contract-button                     │
│  @damarkuncoro/agnostic-ui-contract-input                      │
│  @damarkuncoro/agnostic-ui-contract-icon                       │
│                                                                 │
│  Depends on:                                                   │
│  └── @damarkuncoro/agnostic-ui-contract-core                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ **CONTRACT LAYER: Package Dependencies & Functions**

### **Core Contract Package**
```bash
npm install @damarkuncoro/agnostic-ui-contract-core
```

#### **Key Functions to Use:**
```typescript
import {
  // Variant Management
  Variant,
  VariantType,
  VariantFactory,
  uiSizes,           // ['xs', 'sm', 'md', 'lg', 'xl']
  uiIntents,         // ['primary', 'secondary', 'success', ...]
  uiTones,           // ['solid', 'outline', 'ghost']
  uiEmphases,        // ['low', 'medium', 'high']

  // Token Semantics
  uiSpacingSemantics,
  uiRadiusSemantics,
  uiShadowSemantics,
  uiTypographySemantics,

  // Accessibility
  uiA11yRoles,
  uiA11yKeyboardActions,

  // DDD Architecture (New)
  Contract,
  ContractName,
  CreateVariantUseCaseImpl,
  CreateContractUseCaseImpl,

  // Validation
  validateContract,
  validateComponentProps,

  // Legacy (Deprecated)
  createContract,
  createPropSchema
} from '@damarkuncoro/agnostic-ui-contract-core'
```

#### **What Each Function Does:**
- **`Variant`**: Create domain entities for component variants
- **`VariantFactory`**: Centralized variant creation logic
- **`uiSizes/uiIntents`**: Semantic arrays for validation and autocomplete
- **`validateContract`**: Validate contract definitions
- **`Contract/ContractName`**: DDD entities for contract management

### **Component-Specific Contract Packages**
```bash
npm install @damarkuncoro/agnostic-ui-contract-button
npm install @damarkuncoro/agnostic-ui-contract-input
npm install @damarkuncoro/agnostic-ui-contract-icon
```

#### **Button Contract Functions:**
```typescript
import {
  // DDD Architecture
  ButtonContract,
  CreateButtonContractUseCase,
  createButtonContract,

  // Legacy Compatibility
  UiButtonProps,
  UiButtonVariant,
  UiButtonSize,
  UiButtonIntent,
  uiButtonSizes,
  uiButtonIntents,
  uiButtonTones,

  // Validation
  validateComponentProps
} from '@damarkuncoro/agnostic-ui-contract-button'
```

#### **What Each Function Does:**
- **`ButtonContract`**: Domain entity representing button contract
- **`createButtonContract`**: Factory function for button contracts
- **`UiButtonProps`**: TypeScript interface for button properties
- **`uiButtonSizes`**: Valid size values for buttons

---

## 2️⃣ **BASE LAYER: Package Dependencies & Functions**

### **Component Base Packages**
```bash
npm install @damarkuncoro/agnostic-ui-base-button
npm install @damarkuncoro/agnostic-ui-base-input
npm install @damarkuncoro/agnostic-ui-base-icon
```

#### **Button Base Functions:**
```typescript
import {
  // Core Resolution Logic
  resolveButtonProps,

  // Accessibility Logic
  resolveButtonAccessibility,

  // State Management
  resolveButtonState,

  // Business Logic
  validateButtonInteraction,
  getButtonDefaultProps
} from '@damarkuncoro/agnostic-ui-base-button'
```

#### **What Each Function Does:**
- **`resolveButtonProps`**: Converts contract props to framework-agnostic resolved props
- **`resolveButtonAccessibility`**: Generates ARIA attributes and keyboard support
- **`resolveButtonState`**: Determines component state (disabled, loading, pressed)

#### **Usage Example:**
```typescript
import { resolveButtonProps } from '@damarkuncoro/agnostic-ui-base-button'
import type { UiButtonProps } from '@damarkuncoro/agnostic-ui-contract-button'

function useButtonLogic(props: UiButtonProps) {
  // Resolve props to framework-agnostic format
  const resolved = resolveButtonProps(props)

  return {
    className: resolved.className,
    disabled: resolved.disabled,
    tabIndex: resolved.tabIndex,
    onClick: resolved.onClick,
    ...resolved
  }
}
```

---

## 3️⃣ **THEME LAYER: Package Dependencies & Functions**

### **Theme Packages**
```bash
npm install @damarkuncoro/agnostic-ui-theme-core
npm install @damarkuncoro/agnostic-ui-theme-dark
npm install @damarkuncoro/agnostic-ui-theme-retro
```

#### **Core Theme Functions:**
```typescript
import {
  // Theme Objects
  themeCore,
  themeDark,
  themeRetro,

  // Theme Types
  UiTheme,
  UiColorTokens,
  UiSpacingTokens,
  UiTypographyTokens,

  // Theme Utilities
  mergeThemes,
  validateTheme,
  getThemeValue
} from '@damarkuncoro/agnostic-ui-theme-core'
```

#### **What Each Function Does:**
- **`themeCore`**: Default theme with complete design tokens
- **`mergeThemes`**: Combine multiple themes with overrides
- **`validateTheme`**: Ensure theme structure is valid
- **`getThemeValue`**: Extract specific token values

#### **Usage Example:**
```typescript
import { themeCore, mergeThemes } from '@damarkuncoro/agnostic-ui-theme-core'

// Use default theme
const theme = themeCore

// Create custom theme
const customTheme = mergeThemes(themeCore, {
  tokens: {
    color: {
      palette: {
        primary: {
          500: '#your-brand-color'
        }
      }
    }
  }
})
```

---

## 4️⃣ **SKIN LAYER: Package Dependencies & Functions**

### **Skin Packages**
```bash
npm install @damarkuncoro/agnostic-ui-skin-tailwind
```

#### **Tailwind Skin Functions:**
```typescript
import {
  // Component Skins
  buttonSkin,
  inputSkin,
  iconSkin,

  // Theme Application
  applyTheme,
  applyThemeToClasses,

  // Utility Functions
  cn,                    // Class name merging
  createThemeVariables, // CSS custom properties

  // Skin Utilities
  getVariantClasses,
  getSizeClasses,
  getStateClasses
} from '@damarkuncoro/agnostic-ui-skin-tailwind'
```

#### **What Each Function Does:**
- **`buttonSkin`**: Generate Tailwind classes for buttons
- **`applyTheme`**: Inject CSS custom properties for theme
- **`cn`**: Merge CSS classes with Tailwind's `twMerge`
- **`getVariantClasses`**: Get classes for specific variants

#### **Usage Example:**
```typescript
import { buttonSkin, applyTheme } from '@damarkuncoro/agnostic-ui-skin-tailwind'
import { themeCore } from '@damarkuncoro/agnostic-ui-theme-core'
import { resolveButtonProps } from '@damarkuncoro/agnostic-ui-base-button'

// Apply theme globally
applyTheme(themeCore)

// Generate button classes
function ButtonComponent(props) {
  const resolved = resolveButtonProps(props)
  const classes = buttonSkin(resolved)

  return `<button class="${classes}">${props.children}</button>`
}
```

---

## 5️⃣ **PROVIDER LAYER: Package Dependencies & Functions**

### **Framework Provider Packages**
```bash
npm install @damarkuncoro/agnostic-ui-provider-react
npm install @damarkuncoro/agnostic-ui-provider-vue
```

#### **React Provider Functions:**
```typescript
import {
  // Components
  Button,
  Input,
  Icon,

  // Context Providers
  UiProvider,
  ThemeProvider,

  // Hooks
  useTheme,
  useComponentProps,

  // Utilities
  withValidation,
  withTheme
} from '@damarkuncoro/agnostic-ui-provider-react'
```

#### **What Each Function Does:**
- **`Button/Input/Icon`**: Ready-to-use React components
- **`UiProvider`**: Theme and configuration context provider
- **`useTheme`**: Hook to access current theme
- **`withValidation`**: HOC for component validation

#### **Usage Example:**
```tsx
import { UiProvider, Button } from '@damarkuncoro/agnostic-ui-provider-react'
import { themeCore } from '@damarkuncoro/agnostic-ui-theme-core'

function App() {
  return (
    <UiProvider theme={themeCore}>
      <Button variant={{ intent: 'primary' }}>
        Click me
      </Button>
    </UiProvider>
  )
}
```

---

## 6️⃣ **APPS LAYER: Package Dependencies & Functions**

### **No Specific Packages (Consumer Code)**
The apps layer uses all other layers as needed.

#### **Typical App Dependencies:**
```json
{
  "dependencies": {
    "@damarkuncoro/agnostic-ui-provider-react": "^1.0.0",
    "@damarkuncoro/agnostic-ui-theme-core": "^1.0.0",
    "@damarkuncoro/agnostic-ui-contract-core": "^1.0.0"
  }
}
```

#### **Usage in Apps:**
```tsx
// In your application
import { UiProvider, Button, Input } from '@damarkuncoro/agnostic-ui-provider-react'
import { themeCore } from '@damarkuncoro/agnostic-ui-theme-core'

function MyApp() {
  return (
    <UiProvider theme={themeCore}>
      <div>
        <Button variant={{ intent: 'primary' }}>Submit</Button>
        <Input placeholder="Enter text" />
      </div>
    </UiProvider>
  )
}
```

---

## 🔗 **Complete Implementation Workflow**

### **Step 1: Install Dependencies**
```bash
# Core contracts (always needed)
npm install @damarkuncoro/agnostic-ui-contract-core

# Component contracts
npm install @damarkuncoro/agnostic-ui-contract-button

# Base logic
npm install @damarkuncoro/agnostic-ui-base-button

# Theme
npm install @damarkuncoro/agnostic-ui-theme-core

# Skin
npm install @damarkuncoro/agnostic-ui-skin-tailwind

# Provider (choose your framework)
npm install @damarkuncoro/agnostic-ui-provider-react
```

### **Step 2: Import Functions by Layer**

#### **Contract Layer:**
```typescript
import { Variant, uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core'
import { UiButtonProps, uiButtonSizes } from '@damarkuncoro/agnostic-ui-contract-button'
```

#### **Base Layer:**
```typescript
import { resolveButtonProps } from '@damarkuncoro/agnostic-ui-base-button'
```

#### **Theme Layer:**
```typescript
import { themeCore } from '@damarkuncoro/agnostic-ui-theme-core'
```

#### **Skin Layer:**
```typescript
import { buttonSkin, applyTheme } from '@damarkuncoro/agnostic-ui-skin-tailwind'
```

#### **Provider Layer:**
```typescript
import { Button, UiProvider } from '@damarkuncoro/agnostic-ui-provider-react'
```

### **Step 3: Use in Correct Order**
```typescript
// 1. Contract validation
import { validateComponentProps } from '@damarkuncoro/agnostic-ui-contract-core'

// 2. Base resolution
import { resolveButtonProps } from '@damarkuncoro/agnostic-ui-base-button'

// 3. Theme application
import { applyTheme } from '@damarkuncoro/agnostic-ui-skin-tailwind'

// 4. Skin generation
import { buttonSkin } from '@damarkuncoro/agnostic-ui-skin-tailwind'

// 5. Provider rendering
import { Button } from '@damarkuncoro/agnostic-ui-provider-react'
```

---

## 📋 **Package Reference Table**

| Layer | Package | Key Functions | Purpose |
|-------|---------|----------------|---------|
| **Contract** | `@damarkuncoro/agnostic-ui-contract-core` | `Variant`, `uiSizes`, `validateContract` | Type definitions, validation |
| **Contract** | `@damarkuncoro/agnostic-ui-contract-button` | `UiButtonProps`, `createButtonContract` | Button-specific contracts |
| **Base** | `@damarkuncoro/agnostic-ui-base-button` | `resolveButtonProps` | Framework-agnostic logic |
| **Theme** | `@damarkuncoro/agnostic-ui-theme-core` | `themeCore`, `mergeThemes` | Design token values |
| **Skin** | `@damarkuncoro/agnostic-ui-skin-tailwind` | `buttonSkin`, `applyTheme` | CSS class generation |
| **Provider** | `@damarkuncoro/agnostic-ui-provider-react` | `Button`, `UiProvider` | Framework integration |

---

## 🎯 **Quick Package Selection Guide**

### **"I want to create a new component"**
1. **Contract**: `@damarkuncoro/agnostic-ui-contract-core` + component-specific contract
2. **Base**: Component base package for logic
3. **Theme**: Theme package for styling
4. **Skin**: Skin package for CSS generation
5. **Provider**: Framework provider package

### **"I want to use existing components"**
1. **Provider**: `@damarkuncoro/agnostic-ui-provider-react`
2. **Theme**: `@damarkuncoro/agnostic-ui-theme-core`
3. **Contract-Core**: For validation and types

### **"I want to customize styling"**
1. **Skin**: `@damarkuncoro/agnostic-ui-skin-tailwind`
2. **Theme**: Custom theme package
3. **Base**: For custom logic

### **"I want to validate components"**
1. **Contract-Core**: `validateContract`, `validateComponentProps`
2. **Base**: Component-specific validation

### **"I want to create themes"**
1. **Contract-Core**: Theme types and validation
2. **Theme-Core**: Base theme to extend

---

## 🚀 **Getting Started Examples**

### **Complete Button Implementation:**
```typescript
// 1. Install packages
// npm install @damarkuncoro/agnostic-ui-contract-button @damarkuncoro/agnostic-ui-base-button @damarkuncoro/agnostic-ui-skin-tailwind @damarkuncoro/agnostic-ui-theme-core @damarkuncoro/agnostic-ui-provider-react

// 2. Use in React app
import { UiProvider, Button } from '@damarkuncoro/agnostic-ui-provider-react'
import { themeCore } from '@damarkuncoro/agnostic-ui-theme-core'

function App() {
  return (
    <UiProvider theme={themeCore}>
      <Button variant={{ intent: 'primary', size: 'md' }}>
        Click me
      </Button>
    </UiProvider>
  )
}
```

### **Custom Component Creation:**
```typescript
// 1. Contract definition
import { Variant } from '@damarkuncoro/agnostic-ui-contract-core'

const sizeVariant = Variant.create('SIZE', ['sm', 'md', 'lg'])

// 2. Base logic
import { resolveButtonProps } from '@damarkuncoro/agnostic-ui-base-button'

// 3. Skin generation
import { buttonSkin, applyTheme } from '@damarkuncoro/agnostic-ui-skin-tailwind'

// 4. Theme application
import { themeCore } from '@damarkuncoro/agnostic-ui-theme-core'
applyTheme(themeCore)

// 5. Provider usage
import { Button } from '@damarkuncoro/agnostic-ui-provider-react'
```

---

## ❓ **Common Questions**

**Q: Do I need all packages?**
A: No! Start with provider packages for using components, add others only when customizing.

**Q: Which package for validation?**
A: `validateContract` from `@damarkuncoro/agnostic-ui-contract-core`

**Q: Which package for styling?**
A: `@damarkuncoro/agnostic-ui-skin-tailwind` for CSS classes

**Q: Which package for themes?**
A: `@damarkuncoro/agnostic-ui-theme-core` for design tokens

**Q: Which package for React components?**
A: `@damarkuncoro/agnostic-ui-provider-react`

This guide eliminates confusion about package dependencies and function usage! 🎯