import { ContractName } from '../../shared/value-objects/ContractName';
/**
 * Contract status enumeration
 */
export declare enum ContractStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    DEPRECATED = "deprecated",
    ARCHIVED = "archived"
}
/**
 * Contract Category enumeration
 */
export declare enum ContractCategory {
    CORE = "core",
    COMPONENT = "component",
    THEME = "theme",
    SKIN = "skin",
    UTILITY = "utility"
}
/**
 * Contract Entity
 * Represents a contract definition with its variants, props, and validation rules
 */
export declare class Contract {
    private readonly _id;
    private readonly _createdAt;
    private _updatedAt;
    private _name;
    private _status;
    private _category;
    private _version;
    private _description?;
    private _variants;
    private _props;
    private _accessibility;
    private _validation;
    private _metadata;
    private domainEvents;
    private constructor();
    /**
     * Marks the entity as modified
     */
    private markAsModified;
    /**
     * Creates a new Contract instance
     */
    static create(params: {
        id?: string;
        name: string;
        category: ContractCategory;
        version?: string;
        description?: string;
        variants?: ContractVariant[];
        props?: ContractProp[];
        accessibility?: Partial<ContractAccessibility>;
        validation?: Partial<ContractValidation>;
        metadata?: Record<string, any>;
    }): Contract;
    /**
     * Adds a variant to the contract
     */
    addVariant(variant: ContractVariant): void;
    /**
     * Adds a prop to the contract
     */
    addProp(prop: ContractProp): void;
    /**
     * Updates contract accessibility
     */
    updateAccessibility(accessibility: Partial<ContractAccessibility>): void;
    /**
     * Updates contract validation rules
     */
    updateValidation(validation: Partial<ContractValidation>): void;
    /**
     * Activates the contract
     */
    activate(): void;
    /**
     * Deprecates the contract
     */
    deprecate(): void;
    /**
     * Archives the contract
     */
    archive(): void;
    /**
     * Validates the contract
     */
    validate(): {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    };
    /**
     * Validates business rules
     */
    private validateBusinessRules;
    /**
     * Validates variants
     */
    private validateVariants;
    /**
     * Validates props
     */
    private validateProps;
    /**
     * Validates accessibility
     */
    private validateAccessibility;
    /**
     * Gets variant by name
     */
    getVariant(name: string): ContractVariant | undefined;
    /**
     * Gets prop by name
     */
    getProp(name: string): ContractProp | undefined;
    /**
     * Checks if contract supports a specific variant
     */
    supportsVariant(variantName: string, variantValue: any): boolean;
    /**
     * Gets and clears domain events
     */
    getDomainEvents(): any[];
    /**
     * Adds a domain event
     */
    private addDomainEvent;
    get id(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    get name(): ContractName;
    get status(): ContractStatus;
    get category(): ContractCategory;
    get version(): string;
    get description(): string | undefined;
    get variants(): readonly ContractVariant[];
    get props(): readonly ContractProp[];
    get accessibility(): ContractAccessibility;
    get validation(): ContractValidation;
    get metadata(): Record<string, any>;
    get isActive(): boolean;
    get isDeprecated(): boolean;
    get variantCount(): number;
    get propCount(): number;
    get hasAccessibility(): boolean;
}
/**
 * Contract Variant interface
 */
export interface ContractVariant {
    name: string;
    type: 'size' | 'intent' | 'tone' | 'emphasis' | 'custom';
    values: any[];
    defaultValue?: any;
    description?: string;
}
/**
 * Contract Prop interface
 */
export interface ContractProp {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
    validation?: Record<string, any>;
}
/**
 * Contract Accessibility interface
 */
export interface ContractAccessibility {
    supported: boolean;
    roles: string[];
    keyboardActions: string[];
    ariaAttributes?: string[];
}
/**
 * Contract Validation interface
 */
export interface ContractValidation {
    rules: string[];
    schema: Record<string, any>;
}
//# sourceMappingURL=Contract.d.ts.map