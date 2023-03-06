import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './app/validateEnv';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            encoding: 'utf-8',
            cache: true,
            envFilePath: '.development.env',
            validate: validateEnv,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
