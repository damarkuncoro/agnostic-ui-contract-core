"use strict";
// packages/agnostic-ui-contract-core/src/domain/contract/entities/Contract.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.ContractCategory = exports.ContractStatus = void 0;
const ContractName_1 = require("../../shared/value-objects/ContractName");
const DomainEvent_1 = require("../../shared/events/DomainEvent");
/**
 * Contract status enumeration
 */
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["DRAFT"] = "draft";
    ContractStatus["ACTIVE"] = "active";
    ContractStatus["DEPRECATED"] = "deprecated";
    ContractStatus["ARCHIVED"] = "archived";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
/**
 * Contract Category enumeration
 */
var ContractCategory;
(function (ContractCategory) {
    ContractCategory["CORE"] = "core";
    ContractCategory["COMPONENT"] = "component";
    ContractCategory["THEME"] = "theme";
    ContractCategory["SKIN"] = "skin";
    ContractCategory["UTILITY"] = "utility";
})(ContractCategory || (exports.ContractCategory = ContractCategory = {}));
/**
 * Contract Entity
 * Represents a contract definition with its variants, props, and validation rules
 */
class Contract {
    constructor(id, name, category, metadata = {}) {
        this.domainEvents = [];
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
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
     * Marks the entity as modified
     */
    markAsModified() {
        this._updatedAt = new Date();
    }
    /**
     * Creates a new Contract instance
     */
    static create(params) {
        const contractId = params.id || crypto.randomUUID();
        const contractName = ContractName_1.ContractName.create(params.name);
        const contract = new Contract(contractId, contractName, params.category, params.metadata);
        // Set optional properties
        if (params.version)
            contract._version = params.version;
        if (params.description)
            contract._description = params.description;
        if (params.variants)
            contract._variants = [...params.variants];
        if (params.props)
            contract._props = [...params.props];
        if (params.accessibility)
            contract._accessibility = { ...contract._accessibility, ...params.accessibility };
        if (params.validation)
            contract._validation = { ...contract._validation, ...params.validation };
        // Emit creation event
        contract.addDomainEvent(new DomainEvent_1.ContractCreatedEvent(params.name, params.category));
        return contract;
    }
    /**
     * Adds a variant to the contract
     */
    addVariant(variant) {
        // Check for duplicate variant names
        if (this._variants.some(v => v.name === variant.name)) {
            throw new Error(`Variant '${variant.name}' already exists in contract`);
        }
        this._variants.push(variant);
        this.markAsModified();
        this.addDomainEvent(new DomainEvent_1.VariantCreatedEvent(variant.type, variant.values.map(v => String(v))));
    }
    /**
     * Adds a prop to the contract
     */
    addProp(prop) {
        // Check for duplicate prop names
        if (this._props.some(p => p.name === prop.name)) {
            throw new Error(`Prop '${prop.name}' already exists in contract`);
        }
        this._props.push(prop);
        this.markAsModified();
        this.addDomainEvent(new DomainEvent_1.PropSchemaCreatedEvent(prop.name, prop.type, prop.required));
    }
    /**
     * Updates contract accessibility
     */
    updateAccessibility(accessibility) {
        this._accessibility = { ...this._accessibility, ...accessibility };
        this.markAsModified();
    }
    /**
     * Updates contract validation rules
     */
    updateValidation(validation) {
        this._validation = { ...this._validation, ...validation };
        this.markAsModified();
    }
    /**
     * Activates the contract
     */
    activate() {
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
    deprecate() {
        if (this._status === ContractStatus.ARCHIVED) {
            throw new Error('Cannot deprecate an archived contract');
        }
        this._status = ContractStatus.DEPRECATED;
        this.markAsModified();
    }
    /**
     * Archives the contract
     */
    archive() {
        this._status = ContractStatus.ARCHIVED;
        this.markAsModified();
    }
    /**
     * Validates the contract
     */
    validate() {
        const errors = [];
        const warnings = [];
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
        this.addDomainEvent(new DomainEvent_1.ContractValidatedEvent(this._name.value, isValid, errors.length, warnings.length));
        return { isValid, errors, warnings };
    }
    /**
     * Validates business rules
     */
    validateBusinessRules() {
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
    validateVariants(errors, warnings) {
        const variantNames = new Set();
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
    validateProps(errors, warnings) {
        const propNames = new Set();
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
    validateAccessibility(_errors, warnings) {
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
    getVariant(name) {
        return this._variants.find(v => v.name === name);
    }
    /**
     * Gets prop by name
     */
    getProp(name) {
        return this._props.find(p => p.name === name);
    }
    /**
     * Checks if contract supports a specific variant
     */
    supportsVariant(variantName, variantValue) {
        const variant = this.getVariant(variantName);
        if (!variant)
            return false;
        return variant.values.includes(variantValue);
    }
    /**
     * Gets and clears domain events
     */
    getDomainEvents() {
        const events = [...this.domainEvents];
        this.domainEvents = [];
        return events;
    }
    /**
     * Adds a domain event
     */
    addDomainEvent(event) {
        this.domainEvents.push(event);
    }
    // Getters
    get id() {
        return this._id;
    }
    get createdAt() {
        return new Date(this._createdAt);
    }
    get updatedAt() {
        return new Date(this._updatedAt);
    }
    get name() {
        return this._name;
    }
    get status() {
        return this._status;
    }
    get category() {
        return this._category;
    }
    get version() {
        return this._version;
    }
    get description() {
        return this._description;
    }
    get variants() {
        return [...this._variants];
    }
    get props() {
        return [...this._props];
    }
    get accessibility() {
        return { ...this._accessibility };
    }
    get validation() {
        return { ...this._validation };
    }
    get metadata() {
        return { ...this._metadata };
    }
    get isActive() {
        return this._status === ContractStatus.ACTIVE;
    }
    get isDeprecated() {
        return this._status === ContractStatus.DEPRECATED;
    }
    get variantCount() {
        return this._variants.length;
    }
    get propCount() {
        return this._props.length;
    }
    get hasAccessibility() {
        return this._accessibility.supported;
    }
}
exports.Contract = Contract;
//# sourceMappingURL=Contract.js.map