# 🌊 Complete Data Flow: How Each Layer Works Together

## 🎯 **Overview**

This guide explains the **complete data flow** through Agnostic UI's 6-layer architecture, showing how user interactions flow from the top layer down to rendering, and how data flows back up through validation and state management.

## 🏗️ **The 6-Layer Architecture Recap**

```
🎯 USER INTERACTION
    ↓ (click, type, etc.)
┌─────────────────────────────────────┐
│  📦 APPS LAYER                      │ ← Consumer Applications
│  ├── Storybook (Documentation)      │
│  └── User Applications              │
├─────────────────────────────────────┤
│  🧩 PROVIDER LAYER                  │ ← Framework Integration
│  ├── React/Vue/Angular Components   │
│  └── Event Handling                 │
├─────────────────────────────────────┤
│  🎨 SKIN LAYER                      │ ← Visual Implementation
│  ├── CSS Classes Generation         │
│  └── Theme Application              │
├─────────────────────────────────────┤
│  🎭 THEME LAYER                     │ ← Design Token Values
│  ├── Color Palettes                 │
│  └── Token Resolution               │
├─────────────────────────────────────┤
│  🔧 BASE LAYER                      │ ← Framework-Agnostic Logic
│  ├── Props Resolution               │
│  └── State Management               │
├─────────────────────────────────────┤
│  📋 CONTRACT LAYER                  │ ← Type Definitions
│  ├── Interface Contracts            │
│  └── Validation Rules               │
└─────────────────────────────────────┘
```

---

## 1️⃣ **Complete Flow Example: Button Click**

Let's trace a complete user interaction through all layers:

### **Step 1: User Interaction (Apps Layer)**
```tsx
// User clicks button in React app
function App() {
  return (
    <UiProvider theme={themeCore}>
      <Button
        variant={{ intent: 'primary', size: 'md' }}
        onClick={() => console.log('Clicked!')}
      >
        Click me
      </Button>
    </UiProvider>
  )
}
```

### **Step 2: Provider Layer Processing**
```tsx
// provider-react/src/components/Button.tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {

    // 2a. Validate props against contract
    const validation = validateComponentProps('button', props)
    if (!validation.valid) {
      console.error('Invalid button props:', validation.errors)
    }

    // 2b. Resolve props through base layer
    const resolved = resolveButtonProps(props)

    // 2c. Generate CSS classes through skin layer
    const skinClasses = buttonSkin(resolved)

    // 2d. Apply theme
    const finalClasses = applyThemeToClasses(skinClasses, theme)

    return (
      <button
        ref={ref}
        className={`${finalClasses} ${className || ''}`}
        disabled={resolved.disabled}
        onClick={(e) => {
          // 2e. Handle framework-specific events
          if (!resolved.disabled) {
            onClick?.(e)
          }
        }}
        {...resolved}
      >
        {children}
      </button>
    )
  }
)
```

### **Step 3: Base Layer Resolution**
```typescript
// base-button/src/index.ts
export function resolveButtonProps(props: UiButtonProps): ResolvedButtonProps {
  // 3a. Extract contract-defined properties
  const { variant, size, disabled, loading } = props

  // 3b. Apply business logic rules
  const isDisabled = disabled || loading
  const canInteract = !isDisabled

  // 3c. Generate accessibility attributes
  const a11y = resolveButtonAccessibility(props)

  // 3d. Determine visual state
  const visualState = resolveButtonState(props)

  return {
    // Framework-agnostic resolved properties
    className: '', // Will be filled by skin layer
    disabled: isDisabled,
    tabIndex: isDisabled ? -1 : 0,
    role: 'button',
    'aria-disabled': isDisabled,
    'aria-label': props['aria-label'],
    onClick: canInteract ? props.onClick : undefined,

    // Additional metadata for skin layer
    _variant: variant,
    _size: size,
    _state: visualState
  }
}
```

### **Step 4: Skin Layer Styling**
```typescript
// skin-tailwind/src/components/button.skin.ts
export function buttonSkin(resolved: ResolvedButtonProps): string {
  // 4a. Extract variant and size from resolved props
  const { _variant, _size, _state } = resolved

  // 4b. Generate base classes
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ]

  // 4c. Add variant-specific classes
  const variantClasses = getVariantClasses(_variant)

  // 4d. Add size-specific classes
  const sizeClasses = getSizeClasses(_size)

  // 4e. Add state-specific classes
  const stateClasses = getStateClasses(_state)

  return [...baseClasses, ...variantClasses, ...sizeClasses, ...stateClasses]
    .filter(Boolean)
    .join(' ')
}

function getVariantClasses(variant?: UiButtonVariant): string[] {
  if (!variant?.intent) return []

  const intentMap = {
    primary: ['bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'],
    secondary: ['bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500'],
    success: ['bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'],
    danger: ['bg-red-600 text-white hover:bg-red-700 focus:ring-red-500']
  }

  return intentMap[variant.intent] || []
}
```

### **Step 5: Theme Layer Token Resolution**
```typescript
// skin-tailwind/src/apply-theme.ts
export function applyTheme(theme: UiTheme): void {
  // 5a. Extract color tokens
  const colors = theme.tokens.color

  // 5b. Generate CSS custom properties
  const cssVars = {
    '--ui-color-primary-50': colors.palette.primary?.[50] || '#eff6ff',
    '--ui-color-primary-500': colors.palette.primary?.[500] || '#3b82f6',
    '--ui-color-primary-600': colors.palette.primary?.[600] || '#2563eb',
    '--ui-color-primary-700': colors.palette.primary?.[700] || '#1d4ed8',

    '--ui-color-text-primary': colors.semantic.text?.primary || '#1f2937',
    '--ui-color-text-secondary': colors.semantic.text?.secondary || '#6b7280',

    '--ui-color-bg-surface': colors.semantic.background?.surface || '#ffffff',
    '--ui-color-bg-elevated': colors.semantic.background?.elevated || '#f9fafb'
  }

  // 5c. Apply to :root
  const root = document.documentElement
  Object.entries(cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}
```

### **Step 6: Contract Layer Validation**
```typescript
// contract-button/src/domain/contract/entities/ButtonContract.ts
export class ButtonContract extends BaseEntity {
  constructor(
    private readonly _name: ContractName,
    private readonly _variants: ButtonVariant[],
    private readonly _props: ButtonProp[]
  ) {
    super()
    this.validateContract()
  }

  private validateContract(): void {
    // 6a. Validate variant types
    this._variants.forEach(variant => {
      if (!this.isValidVariantType(variant.type)) {
        throw new ValidationError(
          `Invalid variant type: ${variant.type}`,
          'variant.type',
          variant.type
        )
      }
    })

    // 6b. Validate prop definitions
    this._props.forEach(prop => {
      if (!this.isValidPropDefinition(prop)) {
        throw new ValidationError(
          `Invalid prop definition: ${prop.name}`,
          'props',
          prop
        )
      }
    })

    // 6c. Validate business rules
    this.validateBusinessRules()
  }

  private validateBusinessRules(): void {
    // Ensure required variants exist
    const hasIntentVariant = this._variants.some(v => v.type === 'intent')
    if (!hasIntentVariant) {
      throw new BusinessRuleViolationError(
        'Button contract must include intent variant'
      )
    }
  }
}
```

---

## 2️⃣ **Data Flow Patterns**

### **Pattern 1: Downward Flow (User → Rendering)**
```
User Interaction → Provider Events → Base Resolution → Skin Classes → Theme Tokens → DOM
```

### **Pattern 2: Validation Flow (Contract → Runtime)**
```
Contract Definition → Provider Validation → Base Validation → Skin Validation → Theme Validation
```

### **Pattern 3: State Management Flow**
```
User Action → Provider State → Base State Logic → Skin State Classes → Theme State Tokens
```

### **Pattern 4: Error Handling Flow**
```
Error Occurs → Provider Catch → Base Error Logic → Contract Validation → User Feedback
```

---

## 3️⃣ **Layer Communication Interfaces**

### **Contract → Base Communication**
```typescript
// Contract defines the interface
export interface UiButtonProps {
  variant?: UiButtonVariant
  size?: UiButtonSize
  disabled?: boolean
  loading?: boolean
  onClick?: (event: any) => void
}

// Base implements the resolution
export function resolveButtonProps(props: UiButtonProps): ResolvedButtonProps {
  // Contract guarantees these types
  // Base adds framework-agnostic logic
}
```

### **Base → Skin Communication**
```typescript
// Base provides resolved data with metadata
export interface ResolvedButtonProps {
  // Framework-agnostic properties
  disabled: boolean
  tabIndex?: number
  role: string

  // Metadata for skin layer
  _variant?: UiButtonVariant
  _size?: UiButtonSize
  _state?: ButtonState
}

// Skin uses metadata to generate classes
export function buttonSkin(resolved: ResolvedButtonProps): string {
  const { _variant, _size, _state } = resolved
  // Generate CSS classes based on metadata
}
```

### **Skin → Theme Communication**
```typescript
// Skin requests theme application
export function applyTheme(theme: UiTheme): ThemeApplicationResult {
  // Apply CSS custom properties
  // Return application result
}

// Theme provides token resolution
export function resolveToken(tokenRef: string, theme: UiTheme): string {
  // Resolve $ref references
  // Return concrete values
}
```

### **Provider → All Layers Communication**
```tsx
// Provider orchestrates all layers
function ButtonProvider(props: ButtonProps) {
  // 1. Validate against contract
  const validation = validateComponentProps('button', props)

  // 2. Resolve through base layer
  const resolved = resolveButtonProps(props)

  // 3. Style through skin layer
  const classes = buttonSkin(resolved)

  // 4. Apply theme
  const themedClasses = applyThemeToClasses(classes, theme)

  // 5. Render with framework-specific features
  return <button className={themedClasses} {...resolved} />
}
```

---

## 4️⃣ **Error Flow & Validation**

### **Validation Flow Example**
```typescript
// 1. Contract-level validation
function validateButtonContract(contract: ButtonContract): ValidationResult {
  try {
    // Business rule validation
    contract.validate()
    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      errors: [error.message],
      layer: 'contract'
    }
  }
}

// 2. Props validation at provider level
function validateButtonProps(props: UiButtonProps): ValidationResult {
  const errors: string[] = []

  // Type validation
  if (props.variant && typeof props.variant !== 'object') {
    errors.push('variant must be an object')
  }

  // Business rule validation
  if (props.disabled && props.loading) {
    errors.push('Button cannot be both disabled and loading')
  }

  return {
    valid: errors.length === 0,
    errors,
    layer: 'provider'
  }
}

// 3. Runtime validation in base layer
function validateResolvedProps(resolved: ResolvedButtonProps): ValidationResult {
  // Ensure resolved props are consistent
  if (resolved.disabled && resolved.tabIndex !== -1) {
    return {
      valid: false,
      errors: ['Disabled button must have tabIndex -1'],
      layer: 'base'
    }
  }

  return { valid: true, layer: 'base' }
}
```

### **Error Propagation Flow**
```
Contract Validation Error → Provider → User Feedback
     ↓
Props Validation Error → Base Logic → Graceful Degradation
     ↓
Runtime Error → Skin Fallback → Theme Default Values
     ↓
Framework Error → Provider Boundary → Error Boundary
```

---

## 5️⃣ **State Management Flow**

### **State Flow Example**
```typescript
// 1. User triggers state change
function handleClick() {
  setLoading(true)
  // State flows down: Provider → Base → Skin → Theme
}

// 2. Provider manages framework state
const [loading, setLoading] = useState(false)
const [pressed, setPressed] = useState(false)

// 3. Base resolves state logic
function resolveButtonState(props: ButtonProps, state: ButtonState) {
  return {
    isLoading: props.loading || state.loading,
    isPressed: state.pressed,
    isDisabled: props.disabled || state.loading,
    canInteract: !props.disabled && !state.loading
  }
}

// 4. Skin applies state-based styling
function getStateClasses(state: ButtonState): string[] {
  const classes = []

  if (state.isLoading) classes.push('animate-pulse', 'cursor-wait')
  if (state.isPressed) classes.push('scale-95')
  if (state.isDisabled) classes.push('opacity-50', 'cursor-not-allowed')

  return classes
}

// 5. Theme provides state-specific tokens
const loadingTokens = theme.tokens.animation?.loading || {
  duration: '1s',
  timing: 'ease-in-out'
}
```

---

## 6️⃣ **Performance Optimization Flow**

### **Caching Flow**
```typescript
// 1. Contract caching (rarely changes)
const contractCache = new Map<string, ButtonContract>()

// 2. Props resolution caching (frequent)
const propsCache = new LRUCache<UiButtonProps, ResolvedButtonProps>(100)

// 3. Skin class caching (very frequent)
const skinCache = new TTLCache<string, string>(1000, 300000) // 5 min TTL

// 4. Theme application caching
const themeCache = new Map<string, CSSVariables>()

function resolveButtonEfficiently(props: UiButtonProps): ResolvedButtonProps {
  // Check props cache first
  const cacheKey = JSON.stringify(props)
  if (propsCache.has(cacheKey)) {
    return propsCache.get(cacheKey)!
  }

  // Resolve props
  const resolved = resolveButtonProps(props)

  // Cache result
  propsCache.set(cacheKey, resolved)

  return resolved
}
```

### **Lazy Loading Flow**
```typescript
// 1. Lazy load contracts
const buttonContract = lazy(() => import('@damarkuncoro/agnostic-ui-contract-button'))

// 2. Lazy load base logic
const resolveButtonProps = lazy(() => import('@damarkuncoro/agnostic-ui-base-button'))

// 3. Lazy load skins
const buttonSkin = lazy(() => import('@damarkuncoro/agnostic-ui-skin-tailwind'))

// 4. Lazy load themes
const themeCore = lazy(() => import('@damarkuncoro/agnostic-ui-theme-core'))
```

---

## 7️⃣ **Integration Patterns**

### **Pattern 1: Component Composition**
```tsx
// Higher-order component pattern
function withButtonLogic(WrappedComponent: React.ComponentType<any>) {
  return function ButtonWithLogic(props: ButtonProps) {
    // Contract validation
    const validation = validateComponentProps('button', props)

    // Base resolution
    const resolved = resolveButtonProps(props)

    // Skin application
    const classes = buttonSkin(resolved)

    return (
      <WrappedComponent
        {...props}
        resolved={resolved}
        classes={classes}
        validation={validation}
      />
    )
  }
}
```

### **Pattern 2: Plugin System**
```typescript
interface ButtonPlugin {
  name: string
  transformProps?: (props: UiButtonProps) => UiButtonProps
  transformClasses?: (classes: string) => string
  validate?: (props: UiButtonProps) => ValidationResult
}

class ButtonPluginManager {
  private plugins: ButtonPlugin[] = []

  register(plugin: ButtonPlugin) {
    this.plugins.push(plugin)
  }

  process(props: UiButtonProps): ProcessedButtonProps {
    let currentProps = props
    let currentClasses = ''

    // Apply plugin transformations in order
    for (const plugin of this.plugins) {
      if (plugin.transformProps) {
        currentProps = plugin.transformProps(currentProps)
      }

      if (plugin.validate) {
        const validation = plugin.validate(currentProps)
        if (!validation.valid) {
          throw new Error(`Plugin ${plugin.name}: ${validation.errors.join(', ')}`)
        }
      }
    }

    // Generate final classes
    const resolved = resolveButtonProps(currentProps)
    currentClasses = buttonSkin(resolved)

    for (const plugin of this.plugins) {
      if (plugin.transformClasses) {
        currentClasses = plugin.transformClasses(currentClasses)
      }
    }

    return { props: currentProps, classes: currentClasses, resolved }
  }
}
```

### **Pattern 3: Middleware Chain**
```typescript
type ButtonMiddleware = (
  props: UiButtonProps,
  next: (props: UiButtonProps) => ResolvedButtonProps
) => ResolvedButtonProps

class ButtonMiddlewareChain {
  private middlewares: ButtonMiddleware[] = []

  use(middleware: ButtonMiddleware) {
    this.middlewares.push(middleware)
  }

  resolve(props: UiButtonProps): ResolvedButtonProps {
    let index = 0

    const next = (currentProps: UiButtonProps): ResolvedButtonProps => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++]
        return middleware(currentProps, next)
      }

      // Final resolution
      return resolveButtonProps(currentProps)
    }

    return next(props)
  }
}

// Usage
const chain = new ButtonMiddlewareChain()

// Validation middleware
chain.use((props, next) => {
  const validation = validateComponentProps('button', props)
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '))
  }
  return next(props)
})

// Logging middleware
chain.use((props, next) => {
  console.log('Resolving button props:', props)
  const result = next(props)
  console.log('Resolved to:', result)
  return result
})

// Custom transformation middleware
chain.use((props, next) => {
  const transformed = { ...props, customProp: 'value' }
  return next(transformed)
})

const resolved = chain.resolve(buttonProps)
```

---

## 8️⃣ **Cross-Layer Communication Patterns**

### **Event-Driven Communication**
```typescript
// Domain events flow up from lower layers
class ButtonClickedEvent {
  constructor(
    public readonly buttonId: string,
    public readonly props: UiButtonProps,
    public readonly timestamp: Date = new Date()
  ) {}
}

// Provider publishes events
function ButtonProvider(props: ButtonProps) {
  const handleClick = (event: React.MouseEvent) => {
    // Publish domain event
    publishDomainEvent(new ButtonClickedEvent(
      props.id || 'unknown',
      props
    ))

    // Continue with normal flow
    props.onClick?.(event)
  }
}

// Higher layers can subscribe
subscribeToDomainEvent('ButtonClicked', (event) => {
  // Analytics, logging, etc.
  analytics.track('button_click', {
    buttonId: event.buttonId,
    variant: event.props.variant
  })
})
```

### **Configuration Flow**
```typescript
// Configuration flows down from apps layer
const appConfig = {
  theme: 'dark',
  button: {
    defaultSize: 'md',
    defaultIntent: 'primary',
    enableRipple: true
  }
}

// Provider receives configuration
function UiProvider({ config, children }: UiProviderProps) {
  // Pass config down to components
  return (
    <ButtonConfigContext.Provider value={config.button}>
      <ThemeProvider theme={config.theme}>
        {children}
      </ThemeProvider>
    </ButtonConfigContext.Provider>
  )
}

// Components use configuration
function Button(props: ButtonProps) {
  const config = useContext(ButtonConfigContext)

  // Merge with defaults
  const finalProps = {
    size: props.size || config.defaultSize,
    intent: props.intent || config.defaultIntent,
    ...props
  }

  // Continue with normal flow
  return <ButtonInternal {...finalProps} />
}
```

---

## 🎯 **Flow Summary**

### **Downward Flow (User → Rendering):**
1. **User Interaction** → Apps Layer
2. **Framework Events** → Provider Layer
3. **Props Validation** → Contract Layer
4. **Business Logic** → Base Layer
5. **CSS Generation** → Skin Layer
6. **Token Resolution** → Theme Layer
7. **DOM Rendering** → Browser

### **Upward Flow (Validation → User):**
1. **Contract Validation** → Base Layer
2. **Business Rules** → Provider Layer
3. **Type Checking** → Apps Layer
4. **User Feedback** → Error Display

### **Cross-Layer Communication:**
- **Contracts** define interfaces between layers
- **Resolved Props** carry metadata between layers
- **Domain Events** enable loose coupling
- **Configuration** flows from top to bottom
- **Validation Results** flow from bottom to top

This architecture ensures **separation of concerns** while maintaining **clear communication patterns** between all layers! 🚀