import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RoleEntity } from '@/models/roles/role.entity';
import { roleSeeds } from './role.seeds';

@Injectable()
export class SeedingService {
    private readonly logger: Logger;

    constructor(private readonly entityManager: EntityManager) {
        this.logger = new Logger(SeedingService.name);
    }

    async seed(): Promise<void> {
        const isRoles = await this.hasRoles();
        if (!isRoles) {
            await this.entityManager.save(RoleEntity, roleSeeds);
            this.logger.debug('Successfuly completed seeding for roles...');
        }
    }

    async hasRoles(): Promise<boolean> {
        const roles = await this.entityManager.find(RoleEntity);
        if (roles.length === 3) {
            return true;
        }
        return false;
    }
}
