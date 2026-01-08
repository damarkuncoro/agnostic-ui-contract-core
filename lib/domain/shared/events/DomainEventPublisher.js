"use strict";
/**
 * Domain Event Publisher
 * Handles publishing and subscribing to domain events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainEventPublisher = exports.CompositeDomainEventHandler = exports.BaseDomainEventHandler = exports.InMemoryDomainEventPublisher = void 0;
class InMemoryDomainEventPublisher {
    constructor() {
        this.handlers = [];
    }
    async publish(event) {
        const promises = this.handlers
            .filter(handler => handler.canHandle(event.eventType))
            .map(handler => {
            try {
                const result = handler.handle(event);
                return result instanceof Promise ? result : Promise.resolve();
            }
            catch (error) {
                console.error(`Error handling domain event ${event.eventType}:`, error);
                return Promise.resolve(); // Don't let one handler break others
            }
        });
        await Promise.all(promises);
    }
    async publishAll(events) {
        await Promise.all(events.map(event => this.publish(event)));
    }
    subscribe(handler) {
        if (!this.handlers.includes(handler)) {
            this.handlers.push(handler);
        }
    }
    unsubscribe(handler) {
        const index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }
    /**
     * Clears all handlers (useful for testing)
     */
    clearHandlers() {
        this.handlers = [];
    }
    /**
     * Gets the number of registered handlers
     */
    get handlerCount() {
        return this.handlers.length;
    }
}
exports.InMemoryDomainEventPublisher = InMemoryDomainEventPublisher;
/**
 * Base Domain Event Handler class
 */
class BaseDomainEventHandler {
    canHandle(eventType) {
        return this.supportedEventTypes().includes(eventType);
    }
}
exports.BaseDomainEventHandler = BaseDomainEventHandler;
/**
 * Composite handler that can delegate to multiple handlers
 */
class CompositeDomainEventHandler {
    constructor(handlers) {
        this.handlers = handlers;
    }
    async handle(event) {
        const promises = this.handlers
            .filter(handler => handler.canHandle(event.eventType))
            .map(handler => {
            const result = handler.handle(event);
            return result instanceof Promise ? result : Promise.resolve();
        });
        await Promise.all(promises);
    }
    canHandle(eventType) {
        return this.handlers.some(handler => handler.canHandle(eventType));
    }
    addHandler(handler) {
        this.handlers.push(handler);
    }
    removeHandler(handler) {
        const index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }
}
exports.CompositeDomainEventHandler = CompositeDomainEventHandler;
// Global event publisher instance
exports.domainEventPublisher = new InMemoryDomainEventPublisher();
//# sourceMappingURL=DomainEventPublisher.js.map