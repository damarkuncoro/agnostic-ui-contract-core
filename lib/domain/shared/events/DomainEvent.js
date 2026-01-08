"use strict";
/**
 * Base Domain Event for contract operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropSchemaCreatedEvent = exports.VariantCreatedEvent = exports.ContractValidatedEvent = exports.ContractCreatedEvent = exports.ContractDomainEvent = void 0;
class ContractDomainEvent {
    constructor() {
        this.occurredOn = new Date();
        this.eventId = crypto.randomUUID();
    }
}
exports.ContractDomainEvent = ContractDomainEvent;
class ContractCreatedEvent extends ContractDomainEvent {
    constructor(contractName, category) {
        super();
        this.contractName = contractName;
        this.category = category;
    }
    get eventType() {
        return 'ContractCreated';
    }
}
exports.ContractCreatedEvent = ContractCreatedEvent;
class ContractValidatedEvent extends ContractDomainEvent {
    constructor(contractName, isValid, errorCount, warningCount) {
        super();
        this.contractName = contractName;
        this.isValid = isValid;
        this.errorCount = errorCount;
        this.warningCount = warningCount;
    }
    get eventType() {
        return 'ContractValidated';
    }
}
exports.ContractValidatedEvent = ContractValidatedEvent;
class VariantCreatedEvent extends ContractDomainEvent {
    constructor(variantType, values) {
        super();
        this.variantType = variantType;
        this.values = values;
    }
    get eventType() {
        return 'VariantCreated';
    }
}
exports.VariantCreatedEvent = VariantCreatedEvent;
class PropSchemaCreatedEvent extends ContractDomainEvent {
    constructor(propName, propType, required) {
        super();
        this.propName = propName;
        this.propType = propType;
        this.required = required;
    }
    get eventType() {
        return 'PropSchemaCreated';
    }
}
exports.PropSchemaCreatedEvent = PropSchemaCreatedEvent;
//# sourceMappingURL=DomainEvent.js.map