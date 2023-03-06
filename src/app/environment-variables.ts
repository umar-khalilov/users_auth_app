import { Type } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsPort,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { Environment } from './constants/environment.enum';

export class EnvironmentVariables {
    @IsEnum(Environment)
    @IsNotEmpty()
    readonly NODE_ENV: Environment | undefined;

    @IsString()
    readonly DEPLOY_HOST: string | undefined;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly SERVER_PORT: number | undefined;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly DEBUG_PORT: number | undefined;

    @IsString()
    @IsNotEmpty()
    readonly DB_TYPE: string | undefined;

    @IsString()
    @IsNotEmpty()
    readonly DB_HOST: string | undefined;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly DB_PORT: number | undefined;

    @IsString()
    @IsNotEmpty()
    readonly DB_USER: string | undefined;

    @IsString()
    @IsNotEmpty()
    readonly DB_NAME: string | undefined;

    @IsString()
    @IsNotEmpty()
    readonly DB_PASSWORD: string | undefined;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly REDIS_PORT: number | undefined;

    @IsString()
    @IsNotEmpty()
    readonly REDIS_HOST: string | undefined;

    @IsString()
    @IsNotEmpty()
    readonly REDIS_USERNAME: string | undefined;

    @IsString()
    @IsNotEmpty()
    readonly REDIS_PASSWORD: string | undefined;

    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly CACHE_TTL: number | undefined;
}
