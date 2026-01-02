# @damarkuncoro/agnostic-ui-contract-core

Core contracts and types for Agnostic UI components. This package provides TypeScript interfaces, semantic key arrays, and theme resolution utilities for building design system components that work across different UI frameworks.

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-contract-core
```

## Usage

Import types, semantic key arrays, and utilities for your UI components:

```typescript
import {
  UiTheme,
  UiTokenScale,
  UiExtendedTokens,
  uiSizes,
  uiIntents,
  uiSpacingSemantics,
  resolveTheme
} from '@damarkuncoro/agnostic-ui-contract-core';

// Use semantic arrays for validation and type safety
console.log(uiSizes); // ["xs", "sm", "md", "lg", "xl"]
console.log(uiIntents); // ["primary", "secondary", "success", "warning", "danger", "neutral"]

// Use in your component definitions with semantic props
interface MyButtonProps {
  size?: typeof uiSizes[number];     // Type-safe size prop
  intent?: typeof uiIntents[number]; // Type-safe intent prop
}
```

## Semantic Key Arrays

This package provides comprehensive arrays of all available semantic keys for variants, tokens, and other design system elements. These arrays can be used for:

- Input validation
- Autocomplete/type safety
- Iterating over available options
- Component prop validation
- Design system consistency

### Variants

```typescript
import {
  uiSizes,           // ["xs", "sm", "md", "lg", "xl"]
  uiIntents,         // ["primary", "secondary", "success", "warning", "danger", "neutral"]
  uiTones,           // ["solid", "soft", "outline", "ghost", "link"]
  uiEmphases         // ["low", "medium", "high"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

### Core Tokens

```typescript
import {
  uiSpacingSemantics,      // ["xs", "sm", "md", "lg", "xl"]
  uiRadiusSemantics,       // ["none", "sm", "md", "lg", "full"]
  uiShadowSemantics,       // ["sm", "md", "lg", "focus"]
  uiTypographySemantics,   // ["body", "heading", "caption"]
  uiZIndexSemantics,       // ["dropdown", "sticky", "modal", "popover", "tooltip"]
  uiColorTextSemantics,    // ["primary", "secondary", "muted", "inverse", "disabled"]
  uiColorBackgroundSemantics, // ["surface", "elevated", "muted", "inverse"]
  uiColorBorderSemantics   // ["default", "subtle", "strong", "focus"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

### Extended Tokens

```typescript
import {
  uiLoadingSpinnerSizes,   // ["sm", "md", "lg"]
  uiFormControlHeights,    // ["sm", "md", "lg"]
  uiAnimationSemantics,    // ["enter", "exit", "emphasize", "subtle"]
  uiTimingSemantics,       // ["instant", "fast", "normal", "slow"]
  uiDataVizSemantics       // ["categorical", "sequential", "diverging"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

### Accessibility

```typescript
import {
  uiA11yKeyboardActions,   // ["activate", "confirm", "cancel", "navigate-next", "navigate-prev", "increment", "decrement"]
  uiA11yRoles             // ["button", "link", "checkbox", "radio", "switch", "textbox", "listbox", "option", "menu", "menuitem", "dialog", "alert", "status"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

### Resolver & Theme

```typescript
import {
  uiResolveModes,    // ["static", "runtime"]
  uiThemeVersions    // ["2.1"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

## API

### Types

- `UiTheme`: Complete theme configuration
- `UiTokenScale<T>`: Generic token scale type
- `UiExtendedTokens`: Extended token collection
- `UiThemeVersion`: Supported theme versions
- `UiResolveMode`: Token resolution modes

### Semantic Arrays (21 total)

All semantic key arrays are exported as `const` arrays with corresponding TypeScript union types for type safety.

### Theme Resolution Utilities

- `resolveTheme()`: Resolve theme with token references
- `resolveMath()`: Resolve mathematical expressions in tokens
- `resolveRef()`: Resolve token references
- `resolveResponsive()`: Handle responsive token resolution
- `validateTheme()`: Validate theme configuration

### Default Theme

The package includes a default theme for development:

```typescript
import { defaultTheme } from '@damarkuncoro/agnostic-ui-contract-core';
```

## What This Package Is NOT

- ❌ Not a component library
- ❌ Not a CSS framework
- ❌ Not Tailwind / CSS / DOM related
- ❌ Not framework-specific (React/Vue)

This package defines **semantic contracts and rules**, not UI output.

## Who Should Use This Package

- Design system authors
- UI framework adapter maintainers
- Skin/theme creators
- Component base logic authors

Application developers usually consume this package indirectly.

## Position in Agnostic UI Architecture

```
contract-core
   ↓
theme-core / theme-variants
   ↓
base-components
   ↓
skin (Tailwind / CSS / etc)
   ↓
provider (React / Vue / Web)
```

## Design Principles

- **Semantic over Physical**: Arrays contain semantic identifiers, not physical values (no px, rem, colors)
- **Type Safety**: All arrays have corresponding TypeScript union types
- **Comprehensive Coverage**: Arrays for all variants, tokens, and system elements
- **Framework Agnostic**: Works across different UI frameworks
- **Validation Ready**: Arrays can be used for input validation and prop checking

## License

MIT