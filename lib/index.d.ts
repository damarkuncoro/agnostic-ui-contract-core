import type { ContractCategory, ContractDefinition, PropSchema, ChildrenRules, AccessibilityRules, UiVariantSize, UiVariantIntent, UiVariantTone, UiVariantEmphasis, UiA11yRole, UiA11yKeyboardAction } from './types';
export type { ContractCategory, ContractDefinition, PropSchema, ChildrenRules, AccessibilityRules, UiVariantSize, UiVariantIntent, UiVariantTone, UiVariantEmphasis, UiA11yRole, UiA11yKeyboardAction, ContractProps, ContractEvents } from './types';
/**
 * Standard size variants available across all components
 */
export declare const uiSizes: readonly UiVariantSize[];
/**
 * Standard intent variants for interactive components
 */
export declare const uiIntents: readonly UiVariantIntent[];
/**
 * Standard tone variants for visual weight adjustment
 */
export declare const uiTones: readonly UiVariantTone[];
/**
 * Standard emphasis variants for prominence adjustment
 */
export declare const uiEmphases: readonly UiVariantEmphasis[];
/**
 * Standard ARIA roles that components can implement
 */
export declare const uiA11yRoles: readonly UiA11yRole[];
/**
 * Standard keyboard actions that components should support
 */
export declare const uiA11yKeyboardActions: readonly UiA11yKeyboardAction[];
/**
 * Creates a standardized property schema object
 */
export declare function createPropSchema(options: PropSchema): PropSchema;
/**
 * Creates accessibility rules for a component
 */
export declare function createA11yRules(rules: AccessibilityRules): AccessibilityRules;
/**
 * Creates children rules for a component
 */
export declare function createChildrenRules(rules: ChildrenRules): ChildrenRules;
/**
 * Validates that a value matches a property schema
 */
export declare function validatePropValue(value: any, schema: PropSchema): boolean;
/**
 * Gets the default value for a property schema
 */
export declare function getPropDefault(schema: PropSchema): any;
/**
 * Checks if a property is required
 */
export declare function isPropRequired(schema: PropSchema): boolean;
/**
 * Helper to create a complete contract definition with sensible defaults
 */
export declare function createContract(options: {
    name: string;
    displayName: string;
    category: ContractCategory;
    propsSchema?: Record<string, PropSchema>;
    variants?: Record<string, string[]>;
    events?: string[];
    accessibility?: Partial<AccessibilityRules>;
    children?: ChildrenRules;
    version?: string;
    metadata?: Record<string, any>;
}): ContractDefinition;
/**
 * Validates a complete contract definition
 */
export declare function validateContract(contract: ContractDefinition): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=index.d.ts.map