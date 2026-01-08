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

export class InMemoryDomainEventPublisher implements IDomainEventPublisher {
  private handlers: DomainEventHandler[] = [];

  async publish(event: ContractDomainEvent): Promise<void> {
    const promises = this.handlers
      .filter(handler => handler.canHandle(event.eventType))
      .map(handler => {
        try {
          const result = handler.handle(event);
          return result instanceof Promise ? result : Promise.resolve();
        } catch (error) {
          console.error(`Error handling domain event ${event.eventType}:`, error);
          return Promise.resolve(); // Don't let one handler break others
        }
      });

    await Promise.all(promises);
  }

  async publishAll(events: ContractDomainEvent[]): Promise<void> {
    await Promise.all(events.map(event => this.publish(event)));
  }

  subscribe(handler: DomainEventHandler): void {
    if (!this.handlers.includes(handler)) {
      this.handlers.push(handler);
    }
  }

  unsubscribe(handler: DomainEventHandler): void {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }

  /**
   * Clears all handlers (useful for testing)
   */
  clearHandlers(): void {
    this.handlers = [];
  }

  /**
   * Gets the number of registered handlers
   */
  get handlerCount(): number {
    return this.handlers.length;
  }
}

/**
 * Base Domain Event Handler class
 */
export abstract class BaseDomainEventHandler implements DomainEventHandler {
  abstract handle(event: ContractDomainEvent): Promise<void> | void;

  canHandle(eventType: string): boolean {
    return this.supportedEventTypes().includes(eventType);
  }

  protected abstract supportedEventTypes(): string[];
}

/**
 * Composite handler that can delegate to multiple handlers
 */
export class CompositeDomainEventHandler implements DomainEventHandler {
  constructor(private handlers: DomainEventHandler[]) {}

  async handle(event: ContractDomainEvent): Promise<void> {
    const promises = this.handlers
      .filter(handler => handler.canHandle(event.eventType))
      .map(handler => {
        const result = handler.handle(event);
        return result instanceof Promise ? result : Promise.resolve();
      });

    await Promise.all(promises);
  }

  canHandle(eventType: string): boolean {
    return this.handlers.some(handler => handler.canHandle(eventType));
  }

  addHandler(handler: DomainEventHandler): void {
    this.handlers.push(handler);
  }

  removeHandler(handler: DomainEventHandler): void {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }
}

// Global event publisher instance
export const domainEventPublisher = new InMemoryDomainEventPublisher();