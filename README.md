# @damarkuncoro/agnostic-ui-contract-core

> **Core contracts and theme resolution for Agnostic UI design systems**

This package provides the foundational TypeScript interfaces, semantic key arrays, and intelligent theme resolution utilities that power Agnostic UI components across different frameworks. It establishes the semantic contracts that ensure design system consistency while remaining completely framework-agnostic.

## ✨ Key Features

- 🎯 **Type-Safe Design Tokens**: Comprehensive TypeScript interfaces for themes and tokens
- 🔢 **Semantic Key Arrays**: Predefined arrays for variants, sizes, intents, and more
- 🧮 **Intelligent Token Resolution**: Advanced resolver system with math expressions and responsive values
- 📱 **Breakpoint-Aware Themes**: Dynamic theme resolution based on screen size
- 🔧 **Extensible Pipeline**: Pluggable resolver architecture for custom token types
- 🎨 **Framework Agnostic**: Works with React, Vue, Svelte, and any UI framework

## 🚀 Quick Start

```bash
npm install @damarkuncoro/agnostic-ui-contract-core
```

### Basic Usage

```typescript
import {
  UiTheme,
  uiSizes,
  uiIntents,
  resolveTheme
} from '@damarkuncoro/agnostic-ui-contract-core';

// Type-safe component props
interface ButtonProps {
  size?: typeof uiSizes[number];     // "xs" | "sm" | "md" | "lg" | "xl"
  intent?: typeof uiIntents[number]; // "primary" | "secondary" | ...
}

// Resolve theme with responsive tokens
const resolvedTheme = resolveTheme(theme, {
  mode: "runtime",
  breakpoint: "md"
});
```

### Advanced Token Resolution

```typescript
import { resolveTheme } from '@damarkuncoro/agnostic-ui-contract-core';

// Theme with intelligent token resolution
const theme: UiTheme = {
  version: "2.1",
  tokens: { /* core tokens */ },
  extendedTokens: {
    button: {
      height: { $responsive: { sm: 32, md: 40, lg: 48 } },
      padding: { $math: "spacing.sm * 1.5" },
      borderRadius: { $ref: "radius.md" }
    }
  }
};

// Resolves to concrete values based on breakpoint
const resolved = resolveTheme(theme, {
  mode: "runtime",
  breakpoint: "md"
});
// Result: button.height = 40, button.padding = calculated value, etc.
```

## 📋 Semantic Key Arrays

The package provides **21 comprehensive semantic arrays** that define all available options for design system elements. These arrays ensure consistency across your entire component ecosystem.

### 🎨 Component Variants

```typescript
import {
  uiSizes,           // Size scale: ["xs", "sm", "md", "lg", "xl"]
  uiIntents,         // Color intents: ["primary", "secondary", "success", "warning", "danger", "neutral"]
  uiTones,           // Visual tones: ["solid", "soft", "outline", "ghost", "link"]
  uiEmphases         // Emphasis levels: ["low", "medium", "high"]
} from '@damarkuncoro/agnostic-ui-contract-core';

// Type-safe component props
interface ButtonProps {
  size?: typeof uiSizes[number];      // ✅ Type-safe
  intent?: typeof uiIntents[number];  // ✅ Autocomplete
  tone?: typeof uiTones[number];      // ✅ Validation
}
```

### 🎯 Design Tokens

#### Core Token Semantics
```typescript
import {
  uiSpacingSemantics,      // Spacing scale: ["xs", "sm", "md", "lg", "xl"]
  uiRadiusSemantics,       // Border radius: ["none", "sm", "md", "lg", "full"]
  uiShadowSemantics,       // Shadow levels: ["sm", "md", "lg", "focus"]
  uiTypographySemantics,   // Text styles: ["body", "heading", "caption"]
  uiZIndexSemantics,       // Z-index layers: ["dropdown", "sticky", "modal", "popover", "tooltip"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

#### Color Token Semantics
```typescript
import {
  uiColorTextSemantics,       // Text colors: ["primary", "secondary", "muted", "inverse", "disabled"]
  uiColorBackgroundSemantics, // Backgrounds: ["surface", "elevated", "muted", "inverse"]
  uiColorBorderSemantics      // Borders: ["default", "subtle", "strong", "focus"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

#### Extended Component Tokens
```typescript
import {
  uiLoadingSpinnerSizes,   // Spinner sizes: ["sm", "md", "lg"]
  uiFormControlHeights,    // Input heights: ["sm", "md", "lg"]
  uiAnimationSemantics,    // Animation types: ["enter", "exit", "emphasize", "subtle"]
  uiTimingSemantics,       // Duration scales: ["instant", "fast", "normal", "slow"]
  uiDataVizSemantics       // Data visualization: ["categorical", "sequential", "diverging"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

### ♿ Accessibility Semantics

```typescript
import {
  uiA11yKeyboardActions,   // Keyboard actions: ["activate", "confirm", "cancel", ...]
  uiA11yRoles            // ARIA roles: ["button", "link", "checkbox", "radio", ...]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

### ⚙️ System Configuration

```typescript
import {
  uiResolveModes,    // Resolution modes: ["static", "runtime"]
  uiThemeVersions    // Supported versions: ["2.1"]
} from '@damarkuncoro/agnostic-ui-contract-core';
```

## 🔧 Advanced Usage Patterns

### Theme Validation

```typescript
import { uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

// Runtime validation
function validateButtonProps(props: any) {
  if (!uiSizes.includes(props.size)) {
    throw new Error(`Invalid size: ${props.size}`);
  }
  if (!uiIntents.includes(props.intent)) {
    throw new Error(`Invalid intent: ${props.intent}`);
  }
  return true;
}
```

### Dynamic Array Iteration

```typescript
import { uiSizes, uiIntents } from '@damarkuncoro/agnostic-ui-contract-core';

// Generate all button variants programmatically
const allButtonVariants = uiSizes.flatMap(size =>
  uiIntents.map(intent => ({ size, intent }))
);
// Result: [{size: "xs", intent: "primary"}, {size: "xs", intent: "secondary"}, ...]
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

## 🛡️ Security & Reliability

### 🔒 Security Hardening

The resolver system has been hardened against common security vulnerabilities:

- **Math Expression Injection Protection**: Secure tokenizer prevents code injection through mathematical expressions
- **Input Validation**: Comprehensive validation of theme structures and token values
- **Error Containment**: Proper error handling prevents information leakage
- **Circular Reference Detection**: Prevents infinite loops in token resolution

### ⚡ Performance Optimizations

- **Lookup Caching**: Intelligent caching of resolved token references
- **Breakpoint Optimization**: Semantic breakpoint ordering with fallback logic
- **Pipeline Efficiency**: Step-based resolution with early termination

### 🛠️ Reliability Features

- **Type Safety**: Comprehensive TypeScript types with runtime validation
- **Error Recovery**: Graceful degradation with meaningful error messages
- **Input Sanitization**: Safe handling of user-provided expressions and references

## 🧠 Intelligent Token Resolution

The resolver system is a **sophisticated pipeline** that transforms design tokens into concrete values. It supports references, mathematical expressions, responsive values, and custom resolvers through a pluggable architecture.

### 🎯 Intent Markers

Token values use explicit `$` prefixed markers to declare their resolution type:

```typescript
// 🔗 Reference Resolution
{ $ref: "color.primary" }           // → Resolves to theme color value

// 🧮 Math Expression
{ $math: "spacing.sm * 2 + 4" }     // → Evaluates to computed number

// 📱 Responsive Values
{ $responsive: { sm: 8, md: 12, lg: 16 } }  // → Context-aware resolution

// ✨ Primitive Values (no marker needed)
"16px"                              // → Passed through unchanged
42                                  // → Passed through unchanged
```

### 🔄 Resolution Pipeline

The resolver processes tokens through **4 sequential steps**:

#### 1. 📍 Reference Resolution (`$ref`)
```typescript
// Input token
{ $ref: "spacing.md" }

// Theme lookup
theme.tokens.spacing.md = 12

// Output
12
```

#### 2. 🧮 Math Expression Resolution (`$math`)
```typescript
// Input token
{ $math: "spacing.sm * 2 + 4" }

// With theme context
spacing.sm = 8
// Calculation: (8 * 2) + 4 = 20

// Output
20
```

#### 3. 📱 Responsive Resolution (`$responsive`)
```typescript
// Input token
{ $responsive: { sm: 8, md: 12, lg: 16 } }

// Static mode (build/SSR)
{ $responsive: { sm: 8, md: 12, lg: 16 } } → 16  // Largest breakpoint

// Runtime mode with breakpoint
{ $responsive: { sm: 8, md: 12, lg: 16 } } → 12  // Exact match

// Runtime mode with unknown breakpoint "xl"
{ $responsive: { sm: 8, md: 12, lg: 16 } } → 16  // Closest smaller
```

#### 4. 🔄 Primitive Pass-through
```typescript
// Input
"2rem"  // → Output: "2rem" (unchanged)
24      // → Output: 24 (unchanged)
```

### 🎭 Resolution Modes

#### Static Mode (`"static"`) - Build/SSR Optimization
```typescript
resolveTheme(theme, { mode: "static" })
// ✅ Produces concrete values
// ✅ Fast initial page loads
// ✅ SEO-friendly
// ❌ No runtime responsiveness
```

#### Runtime Mode (`"runtime"`) - Dynamic Client Behavior
```typescript
// Without breakpoint - preserves responsive objects
resolveTheme(theme, { mode: "runtime" })
// ✅ Enables CSS-in-JS dynamic styling
// ✅ Preserves responsive structures

// With breakpoint - resolves to specific values
resolveTheme(theme, { mode: "runtime", breakpoint: "md" })
// ✅ Immediate concrete values
// ✅ Breakpoint-aware resolution
// ✅ Theme switching capability
```

### 🏗️ Extensible Pipeline Architecture

The resolver uses a **step-based architecture** that can be extended with custom resolvers:

```typescript
import { ResolverPipeline, ResolverStep } from '@damarkuncoro/agnostic-ui-contract-core';

// Create custom resolver for opacity values
const opacityResolver: ResolverStep = {
  name: 'opacity',
  canHandle: (value) => typeof value === 'object' && value !== null && '$opacity' in value,
  resolve: (value) => {
    const opacity = (value as any).$opacity;
    return Math.max(0, Math.min(1, opacity)); // Clamp to 0-1
  }
};

// Extend default pipeline
const customPipeline = new ResolverPipeline()
  .addStep(opacityResolver);

// Use custom pipeline
const resolvedTheme = customPipeline.resolve(tokenValue, "runtime", lookup);
```

### 🚨 Error Handling

The resolver system provides comprehensive error handling with typed exceptions:

```typescript
import {
  resolveTheme,
  MathEvaluationError,
  ReferenceResolutionError,
  CircularReferenceError,
  ValidationError
} from '@damarkuncoro/agnostic-ui-contract-core';

try {
  const resolvedTheme = resolveTheme(theme, { mode: "runtime" });
} catch (error) {
  if (error instanceof MathEvaluationError) {
    console.error(`Math evaluation failed: ${error.message}`);
  } else if (error instanceof ReferenceResolutionError) {
    console.error(`Reference not found: ${error.message}`);
  } else if (error instanceof CircularReferenceError) {
    console.error(`Circular reference detected: ${error.message}`);
  } else if (error instanceof ValidationError) {
    console.error(`Validation failed: ${error.message}`);
  }
}
```

### 📊 Advanced Examples

#### Complex Token Resolution
```typescript
const theme: UiTheme = {
  version: "2.1",
  tokens: {
    spacing: { sm: 8, md: 16, lg: 24 },
    colors: { primary: "#007acc" }
  },
  extendedTokens: {
    button: {
      // Responsive height with math expression
      height: { $responsive: {
        sm: { $math: "spacing.sm * 3" },    // 8 * 3 = 24
        md: { $math: "spacing.md * 2.5" },  // 16 * 2.5 = 40
        lg: { $math: "spacing.lg * 2" }     // 24 * 2 = 48
      }},
      // Reference to theme color
      backgroundColor: { $ref: "colors.primary" },
      // Static padding
      padding: { $math: "spacing.sm * 1.5" }  // 8 * 1.5 = 12
    }
  }
};

// Static resolution (build time)
resolveTheme(theme, { mode: "static" });
/*
Result: {
  button: {
    height: 48,           // Largest breakpoint (lg)
    backgroundColor: "#007acc",
    padding: 12
  }
}
*/

// Runtime resolution with breakpoint
resolveTheme(theme, { mode: "runtime", breakpoint: "md" });
/*
Result: {
  button: {
    height: 40,           // md breakpoint resolved
    backgroundColor: "#007acc",
    padding: 12
  }
}
*/
```

#### Inspecting Pipeline Steps
```typescript
import { Resolver } from '@damarkuncoro/agnostic-ui-contract-core';

// View all active resolver steps
console.log(Resolver.pipeline.getSteps());
/*
[
  { name: "ref", canHandle: [Function], resolve: [Function] },
  { name: "math", canHandle: [Function], resolve: [Function] },
  { name: "responsive", canHandle: [Function], resolve: [Function] },
  { name: "primitive", canHandle: [Function], resolve: [Function] }
]
*/
```
```

## 📚 Complete API Reference

### 🎨 Core Types

```typescript
// Theme Configuration
interface UiTheme {
  version: UiThemeVersion                    // "2.1"
  tokens: UiCoreTokens                      // Core design tokens
  extendedTokens?: UiExtendedTokens         // Component-specific tokens
}

// Token Types
type UiTokenValue =
  | UiTokenPrimitive                        // string | number
  | UiTokenRef                             // { $ref: string }
  | UiTokenMath                            // { $math: string }
  | UiTokenResponsive                      // { $responsive: Record<string, UiTokenValue> }

type UiTokenScale<T = UiTokenValue> = Record<string, T>
```

### 🔧 Resolver API

#### Main Functions
```typescript
// Core theme resolution
resolveTheme(
  theme: UiTheme,
  options?: UiResolveOptions
): UiTheme

// Individual resolvers (advanced usage)
resolveRef(value: UiTokenValue, lookup: (ref: string) => unknown): unknown
resolveMath(value: UiTokenValue, lookup: (ref: string) => unknown): unknown
resolveResponsive(value: unknown, mode: UiResolveMode, breakpoint?: string): unknown
```

#### Pipeline API
```typescript
// Create custom pipeline
const pipeline = new ResolverPipeline()

// Add custom resolver step
pipeline.addStep({
  name: 'custom',
  canHandle: (value: unknown) => /* detection logic */,
  resolve: (value: unknown, context: ResolverContext) => /* resolution logic */
})

// Remove step
pipeline.removeStep('stepName')

// Inspect pipeline
pipeline.getSteps(): readonly ResolverStep[]
```

#### Resolver Context
```typescript
interface ResolverContext {
  mode: UiResolveMode                    // "static" | "runtime"
  lookup: (ref: string) => unknown       // Token lookup function
  pipeline: ResolverPipeline             // Reference to pipeline
  breakpoint?: string                    // Current breakpoint (runtime)
}
```

### 📋 Semantic Arrays (21 Arrays)

All arrays include corresponding TypeScript union types for full type safety:

#### Component Variants
- `uiSizes: UiSize[]` - Size scale
- `uiIntents: UiIntent[]` - Color intents
- `uiTones: UiTone[]` - Visual tones
- `uiEmphases: UiEmphasis[]` - Emphasis levels

#### Design Tokens
- `uiSpacingSemantics: UiSpacingSemantic[]` - Spacing scale
- `uiRadiusSemantics: UiRadiusSemantic[]` - Border radius
- `uiShadowSemantics: UiShadowSemantic[]` - Shadow levels
- `uiTypographySemantics: UiTypographySemantic[]` - Text styles
- `uiZIndexSemantics: UiZIndexSemantic[]` - Z-index layers
- `uiColorTextSemantics: UiColorTextSemantic[]` - Text colors
- `uiColorBackgroundSemantics: UiColorBackgroundSemantic[]` - Background colors
- `uiColorBorderSemantics: UiColorBorderSemantic[]` - Border colors

#### Extended Tokens
- `uiLoadingSpinnerSizes: UiLoadingSpinnerSize[]` - Spinner sizes
- `uiFormControlHeights: UiFormControlHeight[]` - Input heights
- `uiAnimationSemantics: UiAnimationSemantic[]` - Animation types
- `uiTimingSemantics: UiTimingSemantic[]` - Duration scales
- `uiDataVizSemantics: UiDataVizSemantic[]` - Data visualization

#### Accessibility
- `uiA11yKeyboardActions: UiA11yKeyboardAction[]` - Keyboard actions
- `uiA11yRoles: UiA11yRole[]` - ARIA roles

#### System
- `uiResolveModes: UiResolveMode[]` - Resolution modes
- `uiThemeVersions: UiThemeVersion[]` - Supported versions

### 🛠️ Advanced Utilities

```typescript
// Theme validation (future feature)
validateTheme(theme: UiTheme): ValidationResult

// Custom resolver creation
createResolverStep(config: ResolverStepConfig): ResolverStep

// Theme merging utilities (future feature)
mergeThemes(base: UiTheme, overrides: Partial<UiTheme>): UiTheme
```

## 🎯 Usage Examples

### Basic Component with Semantic Props

```typescript
import { uiSizes, uiIntents, UiButtonVariant } from '@damarkuncoro/agnostic-ui-contract-core';

interface ButtonProps extends UiButtonVariant {
  children: React.ReactNode
  onClick?: () => void
}

// Type-safe component
function Button({ size = "md", intent = "primary", children, onClick }: ButtonProps) {
  // size is guaranteed to be "xs" | "sm" | "md" | "lg" | "xl"
  // intent is guaranteed to be valid intent
  return <button className={`btn-${size} btn-${intent}`} onClick={onClick}>
    {children}
  </button>
}
```

### Advanced Theme with Token Resolution

```typescript
import { resolveTheme, UiTheme } from '@damarkuncoro/agnostic-ui-contract-core';

const designSystemTheme: UiTheme = {
  version: "2.1",
  tokens: {
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
    colors: { primary: "#007acc", secondary: "#6b7280" },
    radius: { sm: 4, md: 8, lg: 12, full: 9999 }
  },
  extendedTokens: {
    button: {
      height: { $responsive: { sm: 32, md: 40, lg: 48 } },
      paddingX: { $math: "spacing.md * 0.75" },  // 16 * 0.75 = 12
      paddingY: { $math: "spacing.sm * 0.5" },   // 8 * 0.5 = 4
      borderRadius: { $ref: "radius.md" },       // → 8
      backgroundColor: { $ref: "colors.primary" } // → "#007acc"
    }
  }
};

// Build-time resolution (static values)
const staticTheme = resolveTheme(designSystemTheme, { mode: "static" });

// Runtime resolution (breakpoint-aware)
const runtimeTheme = resolveTheme(designSystemTheme, {
  mode: "runtime",
  breakpoint: "md"
});
```

### Custom Resolver Extension

```typescript
import { ResolverPipeline, ResolverStep } from '@damarkuncoro/agnostic-ui-contract-core';

// Custom resolver for CSS custom properties
const cssCustomPropertyResolver: ResolverStep = {
  name: 'css-custom-prop',
  canHandle: (value: unknown) => typeof value === 'object' && value !== null && '$css' in value,
  resolve: (value: unknown) => `var(--${(value as any).$css})`
};

// Extend default pipeline
const extendedPipeline = new ResolverPipeline()
  .addStep(cssCustomPropertyResolver);

// Use in theme
const themeWithCSSVars: UiTheme = {
  version: "2.1",
  tokens: { /* ... */ },
  extendedTokens: {
    button: {
      backgroundColor: { $css: "color-primary" }  // → "var(--color-primary)"
    }
  }
};
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

## 🔄 Recent Improvements

### v2.1 Security & Performance Enhancements

- **🔒 Critical Security Fix**: Replaced vulnerable regex-based math expression parser with secure tokenizer
- **⚡ Performance Optimization**: Added intelligent lookup caching and circular reference detection
- **🎯 Logic Corrections**: Fixed breakpoint comparison logic with semantic ordering
- **🛡️ Error Handling**: Comprehensive error types and proper exception handling
- **✅ Input Validation**: Theme structure validation with meaningful error messages
- **🔧 Pipeline Enhancement**: Complete token resolution for all nested token types
- **📱 Runtime Support**: Enhanced breakpoint-aware resolution with context passing

### Migration Guide

If you're upgrading from earlier versions:

1. **Token Structure**: No breaking changes - existing `$ref`, `$math`, `$responsive` tokens work unchanged
2. **API Compatibility**: All existing functions maintain backward compatibility
3. **Error Handling**: New typed exceptions provide better error context
4. **Performance**: Automatic optimizations with no configuration needed

## License

MIT