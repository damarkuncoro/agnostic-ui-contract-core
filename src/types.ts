// =================================================================
// Agnostic UI Contract Core Types
//
// This file defines the foundational types and interfaces that all
// contracts in the Agnostic UI ecosystem must implement. These types
// ensure consistency and type safety across all component contracts.
// =================================================================

// -----------------------------------------------------------------
// Contract Categories
// -----------------------------------------------------------------

/**
 * Defines the category of a contract, which determines its primary use case
 * and helps with organization and discovery.
 */
export type ContractCategory =
  | 'layout'      // Container and positioning components (box, flex, grid)
  | 'form'        // User input components (input, button, select)
  | 'navigation'  // Navigation elements (link, menu, tabs, breadcrumb)
  | 'feedback'    // Status and messaging (alert, modal, toast, notification)
  | 'data'        // Data display components (table, list, card, chart)
  | 'media'       // Rich content (image, icon, video, audio)
  | 'utility';    // Helper components (spacer, divider, portal)

// -----------------------------------------------------------------
// Property Schema
// -----------------------------------------------------------------

/**
 * Defines the schema for a single component property, including its type,
 * validation rules, and metadata.
 */
export interface PropSchema {
  /** The data type of the property */
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'

  /** Whether this property is required for the component to function */
  required?: boolean

  /** The default value if none is provided */
  default?: any

  /** Array of allowed values for enum-style properties */
  enum?: string[]

  /** Human-readable description of the property's purpose */
  description?: string

  /** Additional validation rules specific to this property */
  validation?: Record<string, any>
}

// -----------------------------------------------------------------
// Children Rules
// -----------------------------------------------------------------

/**
 * Defines constraints on what child components are allowed within a component.
 * This ensures proper component composition and prevents invalid hierarchies.
 */
export interface ChildrenRules {
  /** Array of contract names that are allowed as children */
  allowed: string[]

  /** Maximum number of children allowed */
  max?: number

  /** Minimum number of children required */
  min?: number

  /** Whether children must be ordered in a specific way */
  ordered?: boolean
}

// -----------------------------------------------------------------
// Accessibility Rules
// -----------------------------------------------------------------

/**
 * Defines accessibility requirements and ARIA attributes that the component
 * must implement to be compliant with accessibility standards.
 */
export interface AccessibilityRules {
  /** Required ARIA role for the component */
  role?: string

  /** Whether the component requires an accessible label */
  label?: boolean

  /** Required keyboard interactions (e.g., ['Enter', 'Space']) */
  keyboard?: string[]

  /** Whether the component should be focusable */
  focusable?: boolean

  /** Additional accessibility attributes or requirements */
  [key: string]: any
}

// -----------------------------------------------------------------
// Variant Definitions
// -----------------------------------------------------------------

/**
 * Common size variants available across components
 */
export type UiVariantSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

/**
 * Common intent/color variants for interactive components
 */
export type UiVariantIntent =
  | 'primary'    // Main action, highest emphasis
  | 'secondary'  // Alternative action, medium emphasis
  | 'success'    // Positive outcome or confirmation
  | 'warning'    // Caution or non-critical issue
  | 'error'      // Critical issue or destructive action
  | 'info'       // Informational content
  | 'neutral';   // No specific intent

/**
 * Common tone variants for adjusting visual weight
 */
export type UiVariantTone = 'subtle' | 'normal' | 'strong'

/**
 * Common emphasis variants for adjusting prominence
 */
export type UiVariantEmphasis = 'low' | 'medium' | 'high'

// -----------------------------------------------------------------
// ARIA and Keyboard Support
// -----------------------------------------------------------------

/**
 * Standard ARIA roles that components can implement
 */
export type UiA11yRole =
  | 'button'
  | 'checkbox'
  | 'dialog'
  | 'grid'
  | 'gridcell'
  | 'link'
  | 'list'
  | 'listitem'
  | 'menu'
  | 'menuitem'
  | 'option'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'tab'
  | 'tablist'
  | 'tabpanel'
  | 'textbox'
  | 'tooltip'
  | 'tree'
  | 'treeitem'

/**
 * Standard keyboard actions that components should support
 */
export type UiA11yKeyboardAction =
  | 'Enter'      // Activate primary action
  | 'Space'      // Activate primary action (alternative to Enter)
  | 'Escape'     // Cancel or close
  | 'ArrowUp'    // Navigate up in lists/menus
  | 'ArrowDown'  // Navigate down in lists/menus
  | 'ArrowLeft'  // Navigate left in menus/grids
  | 'ArrowRight' // Navigate right in menus/grids
  | 'Home'       // Go to first item
  | 'End'        // Go to last item
  | 'PageUp'     // Page up in long lists
  | 'PageDown'   // Page down in long lists
  | 'Tab'        // Move focus to next focusable element
  | 'Shift+Tab'; // Move focus to previous focusable element

// -----------------------------------------------------------------
// Contract Definition
// -----------------------------------------------------------------

/**
 * Complete definition of a component contract, including all properties,
 * variants, events, accessibility requirements, and validation rules.
 *
 * This is the core interface that all component contracts must implement.
 */
export interface ContractDefinition {
  /** Unique identifier for the contract (e.g., 'button') */
  name: string

  /** Human-readable display name (e.g., 'Button') */
  displayName: string

  /** The category this contract belongs to */
  category: ContractCategory

  /** Schema defining all available properties */
  propsSchema: Record<string, PropSchema>

  /** Available variants grouped by type */
  variants: Record<string, string[]>

  /** Events that this component can emit */
  events: string[]

  /** Accessibility requirements and ARIA attributes */
  accessibility: AccessibilityRules

  /** Rules for allowed child components */
  children?: ChildrenRules

  /** Version of the contract definition */
  version?: string

  /** Whether this contract is deprecated */
  deprecated?: boolean

  /** Additional metadata about the contract */
  metadata?: Record<string, any>
}

// -----------------------------------------------------------------
// Utility Types
// -----------------------------------------------------------------

/**
 * Extract the props type from a contract definition
 */
export type ContractProps<T extends ContractDefinition> = {
  [K in keyof T['propsSchema']]: T['propsSchema'][K]['type'] extends 'string'
    ? string
    : T['propsSchema'][K]['type'] extends 'number'
    ? number
    : T['propsSchema'][K]['type'] extends 'boolean'
    ? boolean
    : T['propsSchema'][K]['type'] extends 'array'
    ? any[]
    : any
}

/**
 * Extract the events type from a contract definition
 */
export type ContractEvents<T extends ContractDefinition> = {
  [K in T['events'][number]]: (event: any) => void
}