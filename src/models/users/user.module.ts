import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/auth/auth.module';
import { RoleModule } from '../roles/role.module';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisCacheModule } from '@/cache/redis-cache.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        RoleModule,
        forwardRef(() => AuthModule),
        RedisCacheModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
