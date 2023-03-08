import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UserModule } from '@/models/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (
                config: ConfigService,
            ): Promise<JwtModuleOptions> => ({
                secret: config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: config.get<string>(
                        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
                    ),
                    algorithm: 'HS384',
                },
            }),
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
