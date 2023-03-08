import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { RoleTypes } from '@/common/enums/role-types.enum';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    async getRoleByValue(value: RoleTypes): Promise<RoleEntity> {
        const foundRole = await this.roleRepository
            .createQueryBuilder('role')
            .where('role.value = :value', { value })
            .getOne();

        if (!foundRole) {
            throw new NotFoundException(
                `Role with that value: ${value} not found`,
            );
        }
        return foundRole;
    }
}
