import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export class CreateUserDto {
    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The full name of user',
        required: true,
    })
    @Length(3, 450, {
        message: 'fullName cannot be less 3 and more than 450 characters',
    })
    @IsString({ message: 'fullName must be a string' })
    @IsNotEmpty({ message: 'fullName cannot be an empty' })
    readonly fullName: string | undefined;

    @ApiProperty({
        example: 'Bret',
        description: 'The username of user',
        required: true,
    })
    @Length(3, 300, {
        message: 'userName cannot be less 3 and more than 300 characters',
    })
    @IsString({ message: 'userName must be a string' })
    @IsNotEmpty({ message: 'userName cannot be an empty' })
    readonly userName: string | undefined;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of user',
        required: true,
    })
    @IsEmail({}, { message: 'email must be a valid email address' })
    @Length(5, 350, {
        message: 'email cannot be less 5 and more than 350 characters',
    })
    @IsString({ message: 'email must be a string' })
    @IsNotEmpty({ message: 'email cannot be an empty' })
    readonly email: string | undefined;

    @ApiProperty({
        example: '3f4Ij40)LW_2!iw',
        description: 'Password',
        required: true,
    })
    @Matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
        {
            message:
                'password cannot be less than 8 and no more than 32 characters',
        },
    )
    @IsString({ message: 'password must be a string' })
    @IsNotEmpty({ message: 'password cannot be an empty' })
    readonly password: string | undefined;

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
    readonly address: AddressDto | undefined;

    @ApiProperty({
        example: '1-770-736-8031 x56442',
        description: 'The phone number of user',
        required: false,
    })
    @MaxLength(20, {
        message: 'phone cannot be more than 20 characters',
    })
    @IsString({ message: 'phone must be a string' })
    @IsOptional()
    readonly phone: string | undefined;

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
    readonly website: string | undefined;

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
    readonly company: CompanyDto | undefined;
}
