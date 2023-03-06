import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompanyDto {
    @ApiProperty({
        example: 'Romaguera-Crona',
        description: 'The company name',
    })
    @IsString({ message: 'name must be a string' })
    readonly name: string | undefined;

    @ApiProperty({
        example: 'Multi-layered client-server neural-net',
        description: 'The catch phrases',
    })
    @IsString({ message: 'catchPhrase must be a string' })
    readonly catchPhrase: string | undefined;

    @ApiProperty({
        example: 'harness real-time e-markets',
        description: 'The bs',
    })
    @IsString({ message: 'bs must be a string' })
    readonly bs: string | undefined;
}
