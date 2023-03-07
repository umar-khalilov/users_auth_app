import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { UserEntity } from '../users/user.entity';
import { RoleTypes } from '@/common/enums/role-types.enum';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntity {
    @Column({
        type: 'enum',
        enum: RoleTypes,
        unique: true,
        default: RoleTypes.USER,
    })
    readonly type: RoleTypes | undefined;

    @ManyToMany(() => UserEntity, ({ roles }): RoleEntity[] => roles)
    readonly users: Relation<UserEntity[]> = [];

    constructor(partialData: Partial<RoleEntity>) {
        super();
        Object.assign(this, partialData);
    }
}
