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

export class InMemoryCache<T = any> implements ICache<T> {
  protected cache = new Map<string, CacheEntry<T>>();
  private defaultTTL: number;

  constructor(defaultTTL: number = 300000) { // 5 minutes default
    this.defaultTTL = defaultTTL;
  }

  async get(key: string): Promise<T | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      await this.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    return entry.value;
  }

  async set(key: string, value: T, ttl?: number): Promise<void> {
    const expiresAt = ttl ? Date.now() + ttl : (this.defaultTTL ? Date.now() + this.defaultTTL : undefined);

    const entry: CacheEntry<T> = {
      value,
      expiresAt,
      createdAt: Date.now(),
      accessCount: 0,
      lastAccessed: Date.now()
    };

    this.cache.set(key, entry);
  }

  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async has(key: string): Promise<boolean> {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if expired
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      await this.delete(key);
      return false;
    }

    return true;
  }

  async size(): Promise<number> {
    // Clean expired entries
    await this.cleanExpired();
    return this.cache.size;
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    totalEntries: number;
    totalAccesses: number;
    hitRate: number;
    averageAge: number;
  } {
    let totalAccesses = 0;
    let totalAge = 0;
    const now = Date.now();

    for (const entry of this.cache.values()) {
      totalAccesses += entry.accessCount;
      totalAge += (now - entry.createdAt);
    }

    return {
      totalEntries: this.cache.size,
      totalAccesses,
      hitRate: totalAccesses > 0 ? (totalAccesses / (totalAccesses + this.cache.size)) : 0,
      averageAge: this.cache.size > 0 ? totalAge / this.cache.size : 0
    };
  }

  /**
   * Clean expired entries
   */
  private async cleanExpired(): Promise<void> {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt && now > entry.expiresAt) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.cache.delete(key));
  }

  /**
   * Set default TTL
   */
  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl;
  }
}

/**
 * LRU Cache implementation
 */
export class LRUCache<T = any> extends InMemoryCache<T> {
  private maxSize: number;

  constructor(maxSize: number = 1000, defaultTTL?: number) {
    super(defaultTTL);
    this.maxSize = maxSize;
  }

  override async set(key: string, value: T, ttl?: number): Promise<void> {
    // If we're at max size, remove least recently used item
    if (this.cache.size >= this.maxSize) {
      let lruKey: string | null = null;
      let lruTime = Date.now();

      for (const [cacheKey, entry] of this.cache.entries()) {
        if (entry.lastAccessed < lruTime) {
          lruTime = entry.lastAccessed;
          lruKey = cacheKey;
        }
      }

      if (lruKey) {
        this.cache.delete(lruKey);
      }
    }

    await super.set(key, value, ttl);
  }
}

/**
 * Cache decorator for methods
 */
export function Cached(ttl?: number) {
  return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new InMemoryCache(ttl);

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;

      // Try to get from cache first
      const cachedResult = await cache.get(cacheKey);
      if (cachedResult !== null) {
        return cachedResult;
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Cache the result
      await cache.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}

/**
 * Cache key generator
 */
export class CacheKeyGenerator {
  static forMethod(methodName: string, args: any[]): string {
    return `${methodName}:${JSON.stringify(args)}`;
  }

  static forEntity(entityType: string, id: string): string {
    return `${entityType}:${id}`;
  }

  static forCollection(collectionName: string, filters?: Record<string, any>): string {
    const filterStr = filters ? `:${JSON.stringify(filters)}` : '';
    return `${collectionName}${filterStr}`;
  }
}