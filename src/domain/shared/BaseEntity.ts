// packages/agnostic-ui-contract-core/src/domain/shared/BaseEntity.ts

import { ValidationError } from './errors/DomainError';

/**
 * Base Entity class providing common entity functionality
 * Enhanced with proper error handling and domain event support
 */
export abstract class BaseEntity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  protected _version: number = 1;
  protected domainEvents: any[] = [];

  constructor(id: string) {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new ValidationError('Entity ID must be a non-empty string', 'id', id);
    }

    this._id = id.trim();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  get version(): number {
    return this._version;
  }

  protected markAsModified(): void {
    this._updatedAt = new Date();
    this._version++;
  }

  equals(entity: BaseEntity): boolean {
    if (!entity || !(entity instanceof BaseEntity)) {
      return false;
    }
    return this._id === entity._id;
  }

  /**
   * Gets and clears all domain events
   */
  public getDomainEvents(): any[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  /**
   * Adds a domain event
   */
  protected addDomainEvent(event: any): void {
    this.domainEvents.push(event);
  }

  /**
   * Checks if entity has unsaved changes
   */
  public hasUnsavedChanges(): boolean {
    return this.domainEvents.length > 0;
  }

  /**
   * Converts entity to plain object for serialization
   */
  public toJSON(): Record<string, any> {
    return {
      id: this._id,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
      version: this._version
    };
  }
}