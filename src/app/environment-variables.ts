import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsPort, IsString } from 'class-validator';
import { Environment } from './constants/environment.enum';

export class EnvironmentVariables {
    @IsEnum(Environment)
    @IsNotEmpty()
    readonly NODE_ENV: Environment | undefined;

    @IsString()
    readonly DEPLOY_HOST: string | undefined;

    @IsPort()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    readonly SERVER_PORT: number | undefined;

    @IsPort()
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

    @IsPort()
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

    @IsPort()
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
