"use strict";
/**
 * Caching interfaces and implementations for performance optimization
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheKeyGenerator = exports.LRUCache = exports.InMemoryCache = void 0;
exports.Cached = Cached;
class InMemoryCache {
    constructor(defaultTTL = 300000) {
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }
    async get(key) {
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
    async set(key, value, ttl) {
        const expiresAt = ttl ? Date.now() + ttl : (this.defaultTTL ? Date.now() + this.defaultTTL : undefined);
        const entry = {
            value,
            expiresAt,
            createdAt: Date.now(),
            accessCount: 0,
            lastAccessed: Date.now()
        };
        this.cache.set(key, entry);
    }
    async delete(key) {
        return this.cache.delete(key);
    }
    async clear() {
        this.cache.clear();
    }
    async has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        // Check if expired
        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            await this.delete(key);
            return false;
        }
        return true;
    }
    async size() {
        // Clean expired entries
        await this.cleanExpired();
        return this.cache.size;
    }
    /**
     * Get cache statistics
     */
    getStats() {
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
    async cleanExpired() {
        const now = Date.now();
        const expiredKeys = [];
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
    setDefaultTTL(ttl) {
        this.defaultTTL = ttl;
    }
}
exports.InMemoryCache = InMemoryCache;
/**
 * LRU Cache implementation
 */
class LRUCache extends InMemoryCache {
    constructor(maxSize = 1000, defaultTTL) {
        super(defaultTTL);
        this.maxSize = maxSize;
    }
    async set(key, value, ttl) {
        // If we're at max size, remove least recently used item
        if (this.cache.size >= this.maxSize) {
            let lruKey = null;
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
exports.LRUCache = LRUCache;
/**
 * Cache decorator for methods
 */
function Cached(ttl) {
    return function (_target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const cache = new InMemoryCache(ttl);
        descriptor.value = async function (...args) {
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
class CacheKeyGenerator {
    static forMethod(methodName, args) {
        return `${methodName}:${JSON.stringify(args)}`;
    }
    static forEntity(entityType, id) {
        return `${entityType}:${id}`;
    }
    static forCollection(collectionName, filters) {
        const filterStr = filters ? `:${JSON.stringify(filters)}` : '';
        return `${collectionName}${filterStr}`;
    }
}
exports.CacheKeyGenerator = CacheKeyGenerator;
//# sourceMappingURL=Cache.js.map