/**
 * Base Entity class providing common entity functionality
 */
export declare abstract class BaseEntity {
    protected readonly _id: string;
    protected readonly _createdAt: Date;
    protected _updatedAt: Date;
    constructor(id: string);
    get id(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    protected markAsModified(): void;
    equals(entity: BaseEntity): boolean;
}
//# sourceMappingURL=BaseEntity.d.ts.map