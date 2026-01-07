// packages/agnostic-ui-contract-core/src/domain/shared/BaseEntity.ts

/**
 * Base Entity class providing common entity functionality
 */
export abstract class BaseEntity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id: string) {
    this._id = id;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected markAsModified(): void {
    this._updatedAt = new Date();
  }

  equals(entity: BaseEntity): boolean {
    return this._id === entity._id;
  }
}