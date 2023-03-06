import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsObject, IsString, ValidateNested } from 'class-validator';
import { GeoDto } from './geo.dto';

export class AddressDto {
    @ApiProperty({ example: 'Kulas Light', description: 'The street' })
    @IsString({ message: 'street must be a string' })
    readonly street: string | undefined;

    @ApiProperty({ example: 'Apt. 556', description: 'The suite' })
    @IsString({ message: 'suite must be a string' })
    readonly suite: string | undefined;

    @ApiProperty({ example: 'Gwenborough', description: 'The city' })
    @IsString({ message: 'city must be a string' })
    readonly city: string | undefined;

    @ApiProperty({ example: '92998-3874', description: 'The zipcode' })
    @IsString({ message: 'zipcode must be a string' })
    readonly zipcode: string | undefined;

    @ApiProperty({
        example: GeoDto,
        description: 'The geolocation requirements',
    })
    @IsDefined()
    @ValidateNested()
    @Type(() => GeoDto)
    @IsObject({ message: 'geo must be an object' })
    readonly geo: GeoDto | undefined;
}
