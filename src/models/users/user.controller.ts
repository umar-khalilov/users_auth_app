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
} from '@nestjs/common';
import {
    ApiAcceptedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiPaginatedResponse } from '@/common/decorators/paginate-response.decorator';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Find all users' })
    @ApiPaginatedResponse(UserEntity)
    @ApiNotFoundResponse({ description: 'Not found users in database' })
    @Get('/')
    async findAll(
        @Query() pageOptionsDto: PageOptionsDto,
    ): Promise<PaginationDto<UserEntity>> {
        return this.userService.findAll(pageOptionsDto);
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
    @Get('/:id')
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<UserDto> {
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
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @HttpCode(HttpStatus.ACCEPTED)
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
    @HttpCode(HttpStatus.NO_CONTENT)
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
