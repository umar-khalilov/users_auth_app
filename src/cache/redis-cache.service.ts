import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async getValueByKey<T>(key: string): Promise<T | undefined> {
        return this.cacheManager.get<T>(key);
    }

    async setValueByKey(key: string, value: unknown): Promise<void> {
        await this.cacheManager.set(key, value);
    }

    async delValueByKey(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    async hasKey(key: string): Promise<boolean> {
        const value = await this.getValueByKey(key);
        return value ? true : false;
    }
}
