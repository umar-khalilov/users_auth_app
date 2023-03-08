import { RoleEntity } from '../roles/role.entity';
import { AddressDto } from './dto/address.dto';
import { CompanyDto } from './dto/company.dto';

export interface IUser {
    readonly name: string;

    readonly username: string;

    readonly email: string;

    readonly password: string;

    readonly address: AddressDto;

    readonly phone: string;

    readonly website: string;

    readonly company: CompanyDto;
}

export interface IUserWithRoles extends IUser {
    readonly roles: RoleEntity[];
}
