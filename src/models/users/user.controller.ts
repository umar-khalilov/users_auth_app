import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiAcceptedResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiPaginatedResponse } from '@/common/decorators/paginate-response.decorator';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { RoleTypes } from '@/common/enums/role-types.enum';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Find all users' })
    @ApiPaginatedResponse(UserEntity)
    @ApiNotFoundResponse({ description: 'Not found users in database' })
    @ApiForbiddenResponse({ description: 'Forbidden resource' })
    @ApiUnauthorizedResponse({ description: 'User is not authorized' })
    @UseGuards(RolesGuard(RoleTypes.ADMIN, RoleTypes.MANAGER))
    @Get('/')
    async findAll(
        @Query() pageOptionsDto: PageOptionsDto,
    ): Promise<PaginationDto<UserEntity>> {
        return this.userService.findAll(pageOptionsDto);
    }

    @ApiOperation({ summary: 'Add role to user' })
    @ApiNotFoundResponse({ description: 'User or role not found' })
    @ApiUnauthorizedResponse({ description: 'User is not authorized' })
    @ApiForbiddenResponse({ description: 'Forbidden resource' })
    @UseGuards(RolesGuard(RoleTypes.ADMIN))
    @Patch('/role')
    async addRole(@Body() dto: AddRoleDto): Promise<string> {
        return this.userService.addRoleToUser(dto);
    }

    @ApiOperation({ summary: 'Get a user' })
    @ApiParam({
        name: 'id',
        type: 'integer',
        format: 'int64',
        example: 1,
        required: true,
    })
    @ApiOkResponse({ type: UserDto })
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @ApiUnauthorizedResponse({ description: 'User is not authorized' })
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<UserEntity> {
        return this.userService.findOneById(id);
    }

    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({
        name: 'id',
        type: 'integer',
        format: 'int64',
        example: 1,
        required: true,
    })
    @ApiAcceptedResponse({ type: UserDto })
    @ApiUnauthorizedResponse({ description: 'User is not authorized' })
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async update(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        return this.userService.updateById(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({
        name: 'id',
        type: 'integer',
        format: 'int64',
        example: 1,
        required: true,
    })
    @ApiNoContentResponse({
        description: 'Only status code',
    })
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @ApiForbiddenResponse({ description: 'Forbidden resource' })
    @ApiUnauthorizedResponse({ description: 'User is not authorized' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(RolesGuard(RoleTypes.ADMIN, RoleTypes.MANAGER))
    @Delete('/:id')
    async remove(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<void> {
        this.userService.removeById(id);
    }
}
