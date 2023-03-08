import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/users/user.module';
import { RoleModule } from './models/roles/role.module';
import { AuthModule } from './auth/auth.module';
import { validateEnv } from './app/validateEnv';
import { DatabaseOptionsService } from './app/database/database-options.service';
import { SeedingService } from './app/database/seeds/seeding.service';

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
        AuthModule,
        UserModule,
        RoleModule,
    ],
    controllers: [],
    providers: [SeedingService],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(private readonly seedingService: SeedingService) {}

    async onApplicationBootstrap(): Promise<void> {
        // await this.seedingService.seed();
    }
}
