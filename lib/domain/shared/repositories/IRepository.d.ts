/**
 * Generic Repository Interface
 * Follows SOLID principles: Interface Segregation, Dependency Inversion
 */
export interface IRepository<T, TId = string> {
    /**
     * Finds an entity by its ID
     */
    findById(id: TId): Promise<T | null>;
    /**
     * Finds all entities
     */
    findAll(): Promise<T[]>;
    /**
     * Saves an entity
     */
    save(entity: T): Promise<void>;
    /**
     * Deletes an entity by ID
     */
    delete(id: TId): Promise<void>;
    /**
     * Checks if an entity exists by ID
     */
    exists(id: TId): Promise<boolean>;
}
/**
 * Query interface for complex searches
 */
export interface IQuerySpecification<T> {
    isSatisfiedBy(entity: T): boolean;
}
/**
 * Repository with query capabilities
 */
export interface IQueryableRepository<T, TId = string> extends IRepository<T, TId> {
    /**
     * Finds entities matching a specification
     */
    findBySpecification(spec: IQuerySpecification<T>): Promise<T[]>;
    /**
     * Counts entities matching a specification
     */
    countBySpecification(spec: IQuerySpecification<T>): Promise<number>;
}
/**
 * Repository with pagination support
 */
export interface IPaginatedRepository<T, TId = string> extends IRepository<T, TId> {
    /**
     * Finds entities with pagination
     */
    findPaginated(page: number, pageSize: number): Promise<{
        items: T[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
}
/**
 * Unit of Work pattern for transaction management
 */
export interface IUnitOfWork {
    /**
     * Begins a transaction
     */
    beginTransaction(): Promise<void>;
    /**
     * Commits the current transaction
     */
    commit(): Promise<void>;
    /**
     * Rolls back the current transaction
     */
    rollback(): Promise<void>;
    /**
     * Gets a repository for the given entity type
     */
    getRepository<T, TId = string>(entityType: new (...args: any[]) => T): IRepository<T, TId>;
}
/**
 * Base repository implementation with common functionality
 */
export declare abstract class BaseRepository<T extends {
    id: string;
}, TId = string> implements IRepository<T, TId> {
    protected entities: Map<TId, T>;
    findById(id: TId): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
    delete(id: TId): Promise<void>;
    exists(id: TId): Promise<boolean>;
}
/**
 * In-memory repository implementation for testing
 */
export declare class InMemoryRepository<T extends {
    id: string;
}, TId = string> extends BaseRepository<T, TId> implements IQueryableRepository<T, TId> {
    findBySpecification(spec: IQuerySpecification<T>): Promise<T[]>;
    countBySpecification(spec: IQuerySpecification<T>): Promise<number>;
}
/**
 * Repository factory for creating repository instances
 */
export interface IRepositoryFactory {
    createRepository<T, TId = string>(entityType: string): IRepository<T, TId>;
}
/**
 * Contract-specific repository interfaces
 */
export interface IContractRepository<TContract> extends IQueryableRepository<TContract> {
    findByName(name: string): Promise<TContract | null>;
    findActiveContracts(): Promise<TContract[]>;
    findContractsByStatus(status: string): Promise<TContract[]>;
}
export interface IComponentRepository<TComponent> extends IQueryableRepository<TComponent> {
    findByContractId(contractId: string): Promise<TComponent[]>;
    findReusableComponents(): Promise<TComponent[]>;
    findComponentsByVariant(variant: string): Promise<TComponent[]>;
}
//# sourceMappingURL=IRepository.d.ts.map