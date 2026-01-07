// packages/agnostic-ui-contract-core/src/domain/contract/entities/Contract.ts

import { BaseEntity } from '../../shared/BaseEntity';
import { ContractName } from '../../shared/value-objects/ContractName';
import {
  ContractCreatedEvent,
  ContractValidatedEvent,
  VariantCreatedEvent,
  PropSchemaCreatedEvent
} from '../../shared/events/DomainEvent';

/**
 * Contract status enumeration
 */
export enum ContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  DEPRECATED = 'deprecated',
  ARCHIVED = 'archived'
}

/**
 * Contract Category enumeration
 */
export enum ContractCategory {
  CORE = 'core',
  COMPONENT = 'component',
  THEME = 'theme',
  SKIN = 'skin',
  UTILITY = 'utility'
}

/**
 * Contract Entity
 * Represents a contract definition with its variants, props, and validation rules
 */
export class Contract extends BaseEntity {
  private _name: ContractName;
  private _status: ContractStatus;
  private _category: ContractCategory;
  private _version: string;
  private _description?: string;
  private _variants: ContractVariant[];
  private _props: ContractProp[];
  private _accessibility: ContractAccessibility;
  private _validation: ContractValidation;
  private _metadata: Record<string, any>;

  private domainEvents: any[] = [];

  private constructor(
    id: string,
    name: ContractName,
    category: ContractCategory,
    metadata: Record<string, any> = {}
  ) {
    super(id);
    this._name = name;
    this._status = ContractStatus.DRAFT;
    this._category = category;
    this._version = '1.0.0';
    this._variants = [];
    this._props = [];
    this._accessibility = {
      supported: false,
      roles: [],
      keyboardActions: []
    };
    this._validation = {
      rules: [],
      schema: {}
    };
    this._metadata = { ...metadata };
    this.validateBusinessRules();
  }

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
  }): Contract {
    const contractId = params.id || crypto.randomUUID();
    const contractName = ContractName.create(params.name);

    const contract = new Contract(contractId, contractName, params.category, params.metadata);

    // Set optional properties
    if (params.version) contract._version = params.version;
    if (params.description) contract._description = params.description;
    if (params.variants) contract._variants = [...params.variants];
    if (params.props) contract._props = [...params.props];
    if (params.accessibility) contract._accessibility = { ...contract._accessibility, ...params.accessibility };
    if (params.validation) contract._validation = { ...contract._validation, ...params.validation };

    // Emit creation event
    contract.addDomainEvent(new ContractCreatedEvent(
      params.name,
      params.category
    ));

    return contract;
  }

  /**
   * Adds a variant to the contract
   */
  addVariant(variant: ContractVariant): void {
    // Check for duplicate variant names
    if (this._variants.some(v => v.name === variant.name)) {
      throw new Error(`Variant '${variant.name}' already exists in contract`);
    }

    this._variants.push(variant);
    this.markAsModified();

    this.addDomainEvent(new VariantCreatedEvent(
      variant.type,
      variant.values.map(v => String(v))
    ));
  }

  /**
   * Adds a prop to the contract
   */
  addProp(prop: ContractProp): void {
    // Check for duplicate prop names
    if (this._props.some(p => p.name === prop.name)) {
      throw new Error(`Prop '${prop.name}' already exists in contract`);
    }

    this._props.push(prop);
    this.markAsModified();

    this.addDomainEvent(new PropSchemaCreatedEvent(
      prop.name,
      prop.type,
      prop.required
    ));
  }

  /**
   * Updates contract accessibility
   */
  updateAccessibility(accessibility: Partial<ContractAccessibility>): void {
    this._accessibility = { ...this._accessibility, ...accessibility };
    this.markAsModified();
  }

  /**
   * Updates contract validation rules
   */
  updateValidation(validation: Partial<ContractValidation>): void {
    this._validation = { ...this._validation, ...validation };
    this.markAsModified();
  }

  /**
   * Activates the contract
   */
  activate(): void {
    if (this._status === ContractStatus.DEPRECATED || this._status === ContractStatus.ARCHIVED) {
      throw new Error('Cannot activate a deprecated or archived contract');
    }

    // Validate contract before activation
    const validation = this.validate();
    if (!validation.isValid) {
      throw new Error(`Cannot activate invalid contract: ${validation.errors.join(', ')}`);
    }

    this._status = ContractStatus.ACTIVE;
    this.markAsModified();
  }

  /**
   * Deprecates the contract
   */
  deprecate(): void {
    if (this._status === ContractStatus.ARCHIVED) {
      throw new Error('Cannot deprecate an archived contract');
    }

    this._status = ContractStatus.DEPRECATED;
    this.markAsModified();
  }

  /**
   * Archives the contract
   */
  archive(): void {
    this._status = ContractStatus.ARCHIVED;
    this.markAsModified();
  }

  /**
   * Validates the contract
   */
  validate(): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate business rules
    this.validateBusinessRules();

    // Validate variants
    this.validateVariants(errors, warnings);

    // Validate props
    this.validateProps(errors, warnings);

    // Validate accessibility
    this.validateAccessibility(errors, warnings);

    // Validate version format
    if (!/^\d+\.\d+\.\d+$/.test(this._version)) {
      errors.push('Version must follow semantic versioning (x.y.z)');
    }

    const isValid = errors.length === 0;

    this.addDomainEvent(new ContractValidatedEvent(
      this._name.value,
      isValid,
      errors.length,
      warnings.length
    ));

    return { isValid, errors, warnings };
  }

  /**
   * Validates business rules
   */
  private validateBusinessRules(): void {
    if (!this._name) {
      throw new Error('Contract must have a valid name');
    }

    if (this._variants.length === 0) {
      throw new Error('Contract must have at least one variant');
    }

    if (this._props.length === 0) {
      throw new Error('Contract must have at least one prop');
    }
  }

  /**
   * Validates variants
   */
  private validateVariants(errors: string[], warnings: string[]): void {
    const variantNames = new Set<string>();

    for (const variant of this._variants) {
      // Check for duplicate names
      if (variantNames.has(variant.name)) {
        errors.push(`Duplicate variant name: ${variant.name}`);
      }
      variantNames.add(variant.name);

      // Validate variant structure
      if (!variant.name || !variant.type) {
        errors.push(`Variant missing required fields: ${JSON.stringify(variant)}`);
      }

      // Validate variant values
      if (!variant.values || variant.values.length === 0) {
        warnings.push(`Variant '${variant.name}' has no defined values`);
      }
    }
  }

  /**
   * Validates props
   */
  private validateProps(errors: string[], warnings: string[]): void {
    const propNames = new Set<string>();

    for (const prop of this._props) {
      // Check for duplicate names
      if (propNames.has(prop.name)) {
        errors.push(`Duplicate prop name: ${prop.name}`);
      }
      propNames.add(prop.name);

      // Validate prop structure
      if (!prop.name || !prop.type) {
        errors.push(`Prop missing required fields: ${JSON.stringify(prop)}`);
      }

      // Validate required props
      if (prop.required && prop.defaultValue !== undefined) {
        warnings.push(`Required prop '${prop.name}' should not have a default value`);
      }
    }
  }

  /**
   * Validates accessibility
   */
  private validateAccessibility(errors: string[], warnings: string[]): void {
    if (this._accessibility.supported) {
      if (this._accessibility.roles.length === 0) {
        warnings.push('Accessibility-enabled contract should define supported roles');
      }

      if (this._accessibility.keyboardActions.length === 0) {
        warnings.push('Accessibility-enabled contract should define keyboard actions');
      }
    }
  }

  /**
   * Gets variant by name
   */
  getVariant(name: string): ContractVariant | undefined {
    return this._variants.find(v => v.name === name);
  }

  /**
   * Gets prop by name
   */
  getProp(name: string): ContractProp | undefined {
    return this._props.find(p => p.name === name);
  }

  /**
   * Checks if contract supports a specific variant
   */
  supportsVariant(variantName: string, variantValue: any): boolean {
    const variant = this.getVariant(variantName);
    if (!variant) return false;

    return variant.values.includes(variantValue);
  }

  /**
   * Gets and clears domain events
   */
  public getDomainEvents(): any[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  /**
   * Adds a domain event
   */
  private addDomainEvent(event: any): void {
    this.domainEvents.push(event);
  }

  // Getters
  get name(): ContractName {
    return this._name;
  }

  get status(): ContractStatus {
    return this._status;
  }

  get category(): ContractCategory {
    return this._category;
  }

  get version(): string {
    return this._version;
  }

  get description(): string | undefined {
    return this._description;
  }

  get variants(): readonly ContractVariant[] {
    return [...this._variants];
  }

  get props(): readonly ContractProp[] {
    return [...this._props];
  }

  get accessibility(): ContractAccessibility {
    return { ...this._accessibility };
  }

  get validation(): ContractValidation {
    return { ...this._validation };
  }

  get metadata(): Record<string, any> {
    return { ...this._metadata };
  }

  get isActive(): boolean {
    return this._status === ContractStatus.ACTIVE;
  }

  get isDeprecated(): boolean {
    return this._status === ContractStatus.DEPRECATED;
  }

  get variantCount(): number {
    return this._variants.length;
  }

  get propCount(): number {
    return this._props.length;
  }

  get hasAccessibility(): boolean {
    return this._accessibility.supported;
  }
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