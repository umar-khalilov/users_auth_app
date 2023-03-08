import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from './role.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity]), AuthModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
