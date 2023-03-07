import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export class UserDto {
    readonly id: number | undefined;

    readonly name: string | undefined;

    readonly username: string | undefined;

    readonly email: string | undefined;

    readonly address: AddressDto | undefined;

    readonly phone: string | undefined;

    readonly website: string | undefined;

    readonly company: CompanyDto | undefined;

    readonly createdAt: Date | undefined;

    readonly updatedAt: Date | undefined;
}