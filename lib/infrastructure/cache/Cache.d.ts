/**
 * Caching interfaces and implementations for performance optimization
 */
export interface ICache<T = any> {
    get(key: string): Promise<T | null>;
    set(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<boolean>;
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    size(): Promise<number>;
}
export interface CacheEntry<T = any> {
    value: T;
    expiresAt: number | undefined;
    createdAt: number;
    accessCount: number;
    lastAccessed: number;
}
export declare class InMemoryCache<T = any> implements ICache<T> {
    protected cache: Map<string, CacheEntry<T>>;
    private defaultTTL;
    constructor(defaultTTL?: number);
    get(key: string): Promise<T | null>;
    set(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<boolean>;
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    size(): Promise<number>;
    /**
     * Get cache statistics
     */
    getStats(): {
        totalEntries: number;
        totalAccesses: number;
        hitRate: number;
        averageAge: number;
    };
    /**
     * Clean expired entries
     */
    private cleanExpired;
    /**
     * Set default TTL
     */
    setDefaultTTL(ttl: number): void;
}
/**
 * LRU Cache implementation
 */
export declare class LRUCache<T = any> extends InMemoryCache<T> {
    private maxSize;
    constructor(maxSize?: number, defaultTTL?: number);
    set(key: string, value: T, ttl?: number): Promise<void>;
}
/**
 * Cache decorator for methods
 */
export declare function Cached(ttl?: number): (_target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/**
 * Cache key generator
 */
export declare class CacheKeyGenerator {
    static forMethod(methodName: string, args: any[]): string;
    static forEntity(entityType: string, id: string): string;
    static forCollection(collectionName: string, filters?: Record<string, any>): string;
}
//# sourceMappingURL=Cache.d.ts.map