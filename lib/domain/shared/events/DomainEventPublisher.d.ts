/**
 * Domain Event Publisher
 * Handles publishing and subscribing to domain events
 */
import { ContractDomainEvent } from './DomainEvent';
export interface IDomainEventPublisher {
    publish(event: ContractDomainEvent): Promise<void>;
    publishAll(events: ContractDomainEvent[]): Promise<void>;
    subscribe(handler: DomainEventHandler): void;
    unsubscribe(handler: DomainEventHandler): void;
}
export interface DomainEventHandler {
    handle(event: ContractDomainEvent): Promise<void> | void;
    canHandle(eventType: string): boolean;
}
export declare class InMemoryDomainEventPublisher implements IDomainEventPublisher {
    private handlers;
    publish(event: ContractDomainEvent): Promise<void>;
    publishAll(events: ContractDomainEvent[]): Promise<void>;
    subscribe(handler: DomainEventHandler): void;
    unsubscribe(handler: DomainEventHandler): void;
    /**
     * Clears all handlers (useful for testing)
     */
    clearHandlers(): void;
    /**
     * Gets the number of registered handlers
     */
    get handlerCount(): number;
}
/**
 * Base Domain Event Handler class
 */
export declare abstract class BaseDomainEventHandler implements DomainEventHandler {
    abstract handle(event: ContractDomainEvent): Promise<void> | void;
    canHandle(eventType: string): boolean;
    protected abstract supportedEventTypes(): string[];
}
/**
 * Composite handler that can delegate to multiple handlers
 */
export declare class CompositeDomainEventHandler implements DomainEventHandler {
    private handlers;
    constructor(handlers: DomainEventHandler[]);
    handle(event: ContractDomainEvent): Promise<void>;
    canHandle(eventType: string): boolean;
    addHandler(handler: DomainEventHandler): void;
    removeHandler(handler: DomainEventHandler): void;
}
export declare const domainEventPublisher: InMemoryDomainEventPublisher;
//# sourceMappingURL=DomainEventPublisher.d.ts.map