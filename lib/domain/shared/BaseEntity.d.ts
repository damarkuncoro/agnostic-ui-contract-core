/**
 * Base Entity class providing common entity functionality
 * Enhanced with proper error handling and domain event support
 */
export declare abstract class BaseEntity {
    protected readonly _id: string;
    protected readonly _createdAt: Date;
    protected _updatedAt: Date;
    protected _version: number;
    protected domainEvents: any[];
    constructor(id: string);
    get id(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    get version(): number;
    protected markAsModified(): void;
    equals(entity: BaseEntity): boolean;
    /**
     * Gets and clears all domain events
     */
    getDomainEvents(): any[];
    /**
     * Adds a domain event
     */
    protected addDomainEvent(event: any): void;
    /**
     * Checks if entity has unsaved changes
     */
    hasUnsavedChanges(): boolean;
    /**
     * Converts entity to plain object for serialization
     */
    toJSON(): Record<string, any>;
}
//# sourceMappingURL=BaseEntity.d.ts.map