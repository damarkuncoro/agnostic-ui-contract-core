/**
 * Defines the category of a contract, which determines its primary use case
 * and helps with organization and discovery.
 */
export type ContractCategory = 'layout' | 'form' | 'navigation' | 'feedback' | 'data' | 'media' | 'utility';
/**
 * Defines the schema for a single component property, including its type,
 * validation rules, and metadata.
 */
export interface PropSchema {
    /** The data type of the property */
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    /** Whether this property is required for the component to function */
    required?: boolean;
    /** The default value if none is provided */
    default?: any;
    /** Array of allowed values for enum-style properties */
    enum?: string[];
    /** Human-readable description of the property's purpose */
    description?: string;
    /** Additional validation rules specific to this property */
    validation?: Record<string, any>;
}
/**
 * Defines constraints on what child components are allowed within a component.
 * This ensures proper component composition and prevents invalid hierarchies.
 */
export interface ChildrenRules {
    /** Array of contract names that are allowed as children */
    allowed: string[];
    /** Maximum number of children allowed */
    max?: number;
    /** Minimum number of children required */
    min?: number;
    /** Whether children must be ordered in a specific way */
    ordered?: boolean;
}
/**
 * Defines accessibility requirements and ARIA attributes that the component
 * must implement to be compliant with accessibility standards.
 */
export interface AccessibilityRules {
    /** Required ARIA role for the component */
    role?: string;
    /** Whether the component requires an accessible label */
    label?: boolean;
    /** Required keyboard interactions (e.g., ['Enter', 'Space']) */
    keyboard?: string[];
    /** Whether the component should be focusable */
    focusable?: boolean;
    /** Additional accessibility attributes or requirements */
    [key: string]: any;
}
/**
 * Common size variants available across components
 */
export type UiVariantSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
/**
 * Common intent/color variants for interactive components
 */
export type UiVariantIntent = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
/**
 * Common tone variants for adjusting visual weight
 */
export type UiVariantTone = 'subtle' | 'normal' | 'strong';
/**
 * Common emphasis variants for adjusting prominence
 */
export type UiVariantEmphasis = 'low' | 'medium' | 'high';
/**
 * Standard ARIA roles that components can implement
 */
export type UiA11yRole = 'button' | 'checkbox' | 'dialog' | 'grid' | 'gridcell' | 'link' | 'list' | 'listitem' | 'menu' | 'menuitem' | 'option' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'tab' | 'tablist' | 'tabpanel' | 'textbox' | 'tooltip' | 'tree' | 'treeitem';
/**
 * Standard keyboard actions that components should support
 */
export type UiA11yKeyboardAction = 'Enter' | 'Space' | 'Escape' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Home' | 'End' | 'PageUp' | 'PageDown' | 'Tab' | 'Shift+Tab';
/**
 * Complete definition of a component contract, including all properties,
 * variants, events, accessibility requirements, and validation rules.
 *
 * This is the core interface that all component contracts must implement.
 */
export interface ContractDefinition {
    /** Unique identifier for the contract (e.g., 'button') */
    name: string;
    /** Human-readable display name (e.g., 'Button') */
    displayName: string;
    /** The category this contract belongs to */
    category: ContractCategory;
    /** Schema defining all available properties */
    propsSchema: Record<string, PropSchema>;
    /** Available variants grouped by type */
    variants: Record<string, string[]>;
    /** Events that this component can emit */
    events: string[];
    /** Accessibility requirements and ARIA attributes */
    accessibility: AccessibilityRules;
    /** Rules for allowed child components */
    children?: ChildrenRules;
    /** Version of the contract definition */
    version?: string;
    /** Whether this contract is deprecated */
    deprecated?: boolean;
    /** Additional metadata about the contract */
    metadata?: Record<string, any>;
}
/**
 * Extract the props type from a contract definition
 */
export type ContractProps<T extends ContractDefinition> = {
    [K in keyof T['propsSchema']]: T['propsSchema'][K]['type'] extends 'string' ? string : T['propsSchema'][K]['type'] extends 'number' ? number : T['propsSchema'][K]['type'] extends 'boolean' ? boolean : T['propsSchema'][K]['type'] extends 'array' ? any[] : any;
};
/**
 * Extract the events type from a contract definition
 */
export type ContractEvents<T extends ContractDefinition> = {
    [K in T['events'][number]]: (event: any) => void;
};
//# sourceMappingURL=types.d.ts.map