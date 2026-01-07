/**
 * Base Domain Event for contract operations
 */
export declare abstract class ContractDomainEvent {
    readonly occurredOn: Date;
    readonly eventId: string;
    constructor();
    abstract get eventType(): string;
}
export declare class ContractCreatedEvent extends ContractDomainEvent {
    readonly contractName: string;
    readonly category: string;
    constructor(contractName: string, category: string);
    get eventType(): string;
}
export declare class ContractValidatedEvent extends ContractDomainEvent {
    readonly contractName: string;
    readonly isValid: boolean;
    readonly errorCount: number;
    readonly warningCount: number;
    constructor(contractName: string, isValid: boolean, errorCount: number, warningCount: number);
    get eventType(): string;
}
export declare class VariantCreatedEvent extends ContractDomainEvent {
    readonly variantType: string;
    readonly values: string[];
    constructor(variantType: string, values: string[]);
    get eventType(): string;
}
export declare class PropSchemaCreatedEvent extends ContractDomainEvent {
    readonly propName: string;
    readonly propType: string;
    readonly required: boolean;
    constructor(propName: string, propType: string, required: boolean);
    get eventType(): string;
}
//# sourceMappingURL=DomainEvent.d.ts.map