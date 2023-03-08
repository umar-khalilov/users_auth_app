import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { PageMetaDto } from '@/common/dto/page-meta.dto';
import { UserDto } from './dto/user.dto';
import { RoleService } from '../roles/role.service';
import { RoleTypes } from '@/common/enums/role-types.enum';
import { AddRoleDto } from './dto/add-role.dto';
import {
    convertToHashPassword,
    toUserDto,
    typeReturn,
} from '@/common/utils/helpers.util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly roleService: RoleService,
    ) {}

    async createOne(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userRole = await this.roleService.getRoleByValue(RoleTypes.USER);

        return this.userRepository.save({
            ...createUserDto,
            roles: [userRole],
        });
    }

    async findAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PaginationDto<UserEntity>> {
        const { take, skip, order } = pageOptionsDto;
        const [users, itemCount] = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .orderBy('user.createdAt', order)
            .skip(skip)
            .take(take)
            .getManyAndCount();

        if (itemCount === 0) {
            throw new NotFoundException('Not found users in database');
        }
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
        return new PaginationDto<UserEntity>(users, pageMetaDto);
    }

    async findOneById(id: number): Promise<UserEntity> {
        const foundUser = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .where('user.id = :id', { id })
            .getOne();

        if (!foundUser) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return foundUser;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .addSelect(['user.password'])
            .where('user.email = :email', { email })
            .getOneOrFail();
    }

    async updateById(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        if (updateUserDto.password) {
            updateUserDto.password = await convertToHashPassword(
                updateUserDto.password,
            );
        }

        const updatedUser = await typeReturn<UserEntity>(
            this.userRepository
                .createQueryBuilder()
                .update(UserEntity)
                .set(updateUserDto)
                .where('id = :id', { id })
                .returning('*')
                .execute(),
        );
        if (!updatedUser) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return toUserDto(updatedUser);
    }

    async removeById(id: number): Promise<void> {
        const removedUser = await typeReturn<UserEntity>(
            this.userRepository
                .createQueryBuilder()
                .delete()
                .from(UserEntity)
                .where('id = :id', { id })
                .returning('id')
                .execute(),
        );
        if (!removedUser) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
    }

    async addRoleToUser({ userId, value }: AddRoleDto): Promise<string> {
        const user = await this.findOneById(userId);
        const role = await this.roleService.getRoleByValue(value);
        if (user && role) {
            await this.userRepository.save({
                ...user,
                roles: [...user.roles, role],
            });
            return `Role: ${value} to user with that id: ${userId} successfully added`;
        }
        throw new NotFoundException('User or role not found');
    }
}
