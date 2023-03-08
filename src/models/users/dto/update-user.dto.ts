import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDefined,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: AddressDto,
        description: 'Address of the user',
        required: false,
    })
    @IsDefined()
    @ValidateNested()
    @Type(() => AddressDto)
    @IsObject({ message: 'address must be an object' })
    @IsOptional()
    readonly address: AddressDto;

    @ApiProperty({
        example: '1-770-736-8031 x56442',
        description: 'The phone number of user',
        required: false,
    })
    @MaxLength(22, {
        message: 'phone cannot be more than 20 characters',
    })
    @IsString({ message: 'phone must be a string' })
    @IsOptional()
    readonly phone: string;

    @ApiProperty({
        example: 'hildegard.org',
        description: 'The website of user',
        required: false,
    })
    @MaxLength(300, {
        message: 'website cannot be more than 300 characters',
    })
    @IsString({ message: 'website must be a string' })
    @IsOptional()
    readonly website: string;

    @ApiProperty({
        example: CompanyDto,
        description: 'Company of the user',
        required: false,
    })
    @IsDefined()
    @ValidateNested()
    @Type(() => CompanyDto)
    @IsObject({ message: 'company must be an object' })
    @IsOptional()
    readonly company: CompanyDto;
}
