import { RoleTypes } from '@/common/enums/role-types.enum';

export interface IRole {
    readonly value: RoleTypes;
    readonly description: string;
}
