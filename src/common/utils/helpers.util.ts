import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { hashPassword, validatePassword } from 'metautil';
import { UserEntity } from '@/models/users/user.entity';
import { UserDto } from '@/models/users/dto/user.dto';

const typeReturn = async <T>(
    mutation: Promise<UpdateResult | DeleteResult | InsertResult>,
): Promise<T> => {
    return mutation.then(res => res.raw[0]);
};

const omitBy = <T extends object, K extends keyof T>(
    data: T,
    props: Array<K>,
): Omit<T, K> => {
    if (!data || !Array.isArray(props) || !props.length) {
        return data;
    }
    return props.reduce((acc, prop) => {
        const { [prop as keyof object]: prop1, ...rest } = acc;
        return rest;
    }, data);
};

const convertToHashPassword = async (password: string): Promise<string> => {
    return hashPassword(password);
};

const checkIsMatch = async (
    password: string,
    hashedPassword: string,
): Promise<boolean> => {
    return validatePassword(password, hashedPassword);
};

const toUserDto = async (data: UserEntity): Promise<UserDto> => {
    const {
        id,
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
        roles,
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
        roles,
        createdAt,
        updatedAt,
    };
    return userDto;
};

export { typeReturn, omitBy, toUserDto, convertToHashPassword, checkIsMatch };
