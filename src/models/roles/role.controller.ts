import { Controller, Get, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { RoleTypes } from '@/common/enums/role-types.enum';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('/roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @ApiOperation({ summary: 'Get all roles' })
    @ApiUnauthorizedResponse({ description: 'User is not authorized' })
    @ApiForbiddenResponse({ description: 'Forbidden resource' })
    @ApiOkResponse({ type: [RoleEntity] })
    @UseGuards(RolesGuard(RoleTypes.ADMIN, RoleTypes.MANAGER))
    @Get('/')
    async getAll(): Promise<RoleEntity[]> {
        return this.roleService.getAllRoles();
    }
}
