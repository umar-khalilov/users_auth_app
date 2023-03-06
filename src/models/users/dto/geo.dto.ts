import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class GeoDto {
    @ApiProperty({
        example: -37.3159,
        description: 'The latitude coordinate',
    })
    @IsLatitude({ message: 'lat must be a valid latitude coordinate' })
    readonly lat: number | undefined;

    @ApiProperty({
        example: 81.1496,
        description: 'The longitude coordinate',
    })
    @IsLongitude({ message: 'lng must be a valid longitude coordinate' })
    readonly lng: number | undefined;
}
