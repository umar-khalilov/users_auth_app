import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './app/validateEnv';
import { UserModule } from './models/users/user.module';
import { RoleModule } from './models/roles/role.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            encoding: 'utf-8',
            cache: true,
            envFilePath: '.development.env',
            validate: validateEnv,
        }),
        UserModule,
        RoleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
