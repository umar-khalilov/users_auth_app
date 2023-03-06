import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export class CreateUserDto {
    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The full name of user',
    })
    readonly fullName: string | undefined;

    @ApiProperty({
        example: 'Bret',
        description: 'The username of user',
    })
    readonly userName: string | undefined;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of user',
    })
    readonly email: string | undefined;

    @ApiProperty({ example: AddressDto, description: 'Address of the user' })
    readonly address: AddressDto | undefined;

    @ApiProperty({
        example: '1-770-736-8031 x56442',
        description: 'The phone number of user',
    })
    readonly phone: string | undefined;

    @ApiProperty({
        example: 'hildegard.org',
        description: 'The website of user',
    })
    readonly website: string | undefined;

    @ApiProperty({ example: CompanyDto, description: 'Company of the user' })
    readonly company: CompanyDto | undefined;
}
