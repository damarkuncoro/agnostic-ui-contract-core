/**
 * Base Domain Event for contract operations
 */

export abstract class ContractDomainEvent {
  public readonly occurredOn: Date
  public readonly eventId: string

  constructor() {
    this.occurredOn = new Date()
    this.eventId = crypto.randomUUID()
  }

  abstract get eventType(): string
}

export class ContractCreatedEvent extends ContractDomainEvent {
  constructor(
    public readonly contractName: string,
    public readonly category: string
  ) {
    super()
  }

  get eventType(): string {
    return 'ContractCreated'
  }
}

export class ContractValidatedEvent extends ContractDomainEvent {
  constructor(
    public readonly contractName: string,
    public readonly isValid: boolean,
    public readonly errorCount: number,
    public readonly warningCount: number
  ) {
    super()
  }

  get eventType(): string {
    return 'ContractValidated'
  }
}

export class VariantCreatedEvent extends ContractDomainEvent {
  constructor(
    public readonly variantType: string,
    public readonly values: string[]
  ) {
    super()
  }

  get eventType(): string {
    return 'VariantCreated'
  }
}

export class PropSchemaCreatedEvent extends ContractDomainEvent {
  constructor(
    public readonly propName: string,
    public readonly propType: string,
    public readonly required: boolean
  ) {
    super()
  }

  get eventType(): string {
    return 'PropSchemaCreated'
  }
}