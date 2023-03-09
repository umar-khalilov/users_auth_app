import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Environment } from './constants/environment.enum';

export class EnvironmentVariables {
    @IsEnum(Environment)
    @IsNotEmpty()
    readonly NODE_ENV: Environment;

    @IsString()
    readonly DEPLOY_HOST: string;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly SERVER_PORT: number;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly DEBUG_PORT: number;

    @IsString()
    @IsNotEmpty()
    readonly DB_TYPE: string;

    @IsString()
    @IsNotEmpty()
    readonly DB_HOST: string;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly DB_PORT: number;

    @IsString()
    @IsNotEmpty()
    readonly DB_USER: string;

    @IsString()
    @IsNotEmpty()
    readonly DB_NAME: string;

    @IsString()
    @IsNotEmpty()
    readonly DB_PASSWORD: string;

    @Min(0)
    @Max(65535)
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly REDIS_PORT: number;

    @IsString()
    @IsNotEmpty()
    readonly REDIS_HOST: string;

    @IsString()
    @IsNotEmpty()
    readonly REDIS_USERNAME: string;

    @IsString()
    @IsNotEmpty()
    readonly REDIS_PASSWORD: string;

    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly CACHE_TTL: number;

    @IsString()
    @IsNotEmpty()
    readonly JWT_ACCESS_TOKEN_SECRET: string;

    @IsString()
    @IsNotEmpty()
    readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
}
