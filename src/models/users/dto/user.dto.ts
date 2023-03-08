import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';
import { RoleEntity } from '@/models/roles/role.entity';

export class UserDto {
    readonly id: number;

    readonly name: string;

    readonly username: string;

    readonly email: string;

    readonly address: AddressDto;

    readonly phone: string;

    readonly website: string;

    readonly company: CompanyDto;

    readonly roles: RoleEntity[];

    readonly createdAt: Date;

    readonly updatedAt: Date;
}
