import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RoleEntity } from '@/models/roles/role.entity';
import { UserEntity } from '@/models/users/user.entity';
import { userSeeds, UserWithoutPassword } from './user.seeds';
import { roleSeeds } from './role.seeds';
import { IUserWithRoles } from '@/models/users/user.interface';
import { convertToHashPassword } from '@/common/utils/helpers.util';

@Injectable()
export class SeedingService {
    private readonly logger: Logger;

    constructor(private readonly entityManager: EntityManager) {
        this.logger = new Logger(SeedingService.name);
    }

    public async seed(): Promise<void> {
        const isRoles = await this.hasRoles();
        if (!isRoles) {
            await this.entityManager.save(RoleEntity, roleSeeds);
            this.logger.debug('Successfuly completed seeding for roles...');
        }

        const isUsers = await this.hasUsers();
        if (!isUsers) {
            const users = await this.prepareUsers(userSeeds);
            await this.entityManager.save(UserEntity, users);
            this.logger.debug('Successfuly completed seeding for users...');
        }
    }

    private async hasRoles(): Promise<boolean> {
        const roles = await this.getRoles();
        if (roles.length === 3) {
            return true;
        }
        return false;
    }

    private async hasUsers(): Promise<boolean> {
        const user = await this.entityManager.findOneBy(UserEntity, {
            id: 10,
        });
        if (user) {
            return true;
        }
        return false;
    }

    private async getRoles(): Promise<RoleEntity[]> {
        return this.entityManager.find(RoleEntity);
    }

    private async prepareUsers(
        userSeeds: UserWithoutPassword[],
    ): Promise<IUserWithRoles[]> {
        const preparedUsers: IUserWithRoles[] = [];

        const roles = await this.getRoles();

        for (let index = 0; index < userSeeds.length; index++) {
            const hashedPassword = await convertToHashPassword(
                `${index}superSe4kret)_3OoPassw`,
            );

            preparedUsers.push({
                ...userSeeds[index],
                password: hashedPassword,
                roles:
                    index === 9 ? [roles[2], roles[0]] : [roles[2], roles[1]],
            });
        }
        return preparedUsers;
    }
}
