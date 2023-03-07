import { UserDto } from '@/models/users/dto/user.dto';
import { UserEntity } from '@/models/users/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

const typeReturn = async <T>(
    mutation: Promise<UpdateResult | DeleteResult | InsertResult>,
): Promise<T> => {
    return mutation.then(res => res.raw[0]);
};

const toUserDto = (data: UserEntity): UserDto => {
    const {
        id,
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
        createdAt,
        updatedAt,
    } = data;

    const userDto: UserDto = {
        id,
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
        createdAt,
        updatedAt,
    };
    return userDto;
};

export { typeReturn, toUserDto };
