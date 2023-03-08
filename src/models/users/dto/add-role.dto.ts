import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { RoleTypes } from '@/common/enums/role-types.enum';

export class AddRoleDto {
    @ApiProperty({ example: 1, description: 'User id' })
    @IsInt({ message: 'userId must be an integer value' })
    @IsNotEmpty({ message: 'userId cannot be an empty value' })
    readonly userId: number;

    @ApiProperty({
        example: RoleTypes.MANAGER,
        enum: RoleTypes,
        description: 'Role value',
    })
    @IsEnum(RoleTypes, { message: 'value must be an enum value' })
    @IsNotEmpty({ message: 'value cannot be an empty value' })
    readonly value: RoleTypes;
}
