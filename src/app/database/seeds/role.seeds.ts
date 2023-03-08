import { RoleTypes } from '@/common/enums/role-types.enum';
import { IRole } from '@/models/roles/role.interface';

export const roleSeeds: IRole[] = [
    {
        value: RoleTypes.ADMIN,
        description: 'Administrator a God object',
    },
    {
        value: RoleTypes.MANAGER,
        description: 'Manager manage some processes',
    },
    {
        value: RoleTypes.USER,
        description: 'User has a little power',
    },
];
