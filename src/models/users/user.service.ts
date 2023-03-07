import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserDto, typeReturn } from '@/common/utils/helpers.util';
import { PostgresErrorCode } from '@/app/database/constraints/errors.constraint';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { PageMetaDto } from '@/common/dto/page-meta.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createOne(createUserDto: CreateUserDto): Promise<UserEntity | void> {
        return typeReturn<UserEntity>(
            this.userRepository
                .createQueryBuilder()
                .insert()
                .into(UserEntity)
                .values(createUserDto)
                .returning('*')
                .execute(),
        ).catch(error => {
            if (error.code === PostgresErrorCode.UniqueViolation) {
                throw new ConflictException(
                    `User with that email: ${createUserDto.email} already exist`,
                );
            }
            throw new BadRequestException('Invalid of data');
        });
    }

    async findAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PaginationDto<UserEntity>> {
        const { take, skip, order } = pageOptionsDto;
        const [users, itemCount] = await this.userRepository
            .createQueryBuilder('users')
            .orderBy('users.createdAt', order)
            .skip(skip)
            .take(take)
            .getManyAndCount();

        if (itemCount === 0) {
            throw new NotFoundException('Not found users in database');
        }
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
        return new PaginationDto<UserEntity>(users, pageMetaDto);
    }

    async findOneById(id: number): Promise<UserDto> {
        const foundUser = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!foundUser) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return toUserDto(foundUser);
    }

    async updateById(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        const updatedUser = await typeReturn<UserEntity>(
            this.userRepository
                .createQueryBuilder()
                .update(UserEntity)
                .set(updateUserDto)
                .where('id = :id', { id })
                .returning([
                    'id',
                    'name',
                    'username',
                    'email',
                    'address',
                    'phone',
                    'website',
                    'company',
                ])
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
}
