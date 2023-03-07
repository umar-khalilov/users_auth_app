import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './app/validateEnv';
import { UserModule } from './models/users/user.module';
import { RoleModule } from './models/roles/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptionsService } from './app/database/database-options.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '.development.env',
            validate: validateEnv,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseOptionsService,
        }),
        UserModule,
        RoleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
