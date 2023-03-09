import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { UserEntity } from '../users/user.entity';
import { RoleTypes } from '@/common/enums/role-types.enum';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntity {
    @ApiProperty({
        enum: RoleTypes,
        example: RoleTypes.ADMIN,
        description: 'Role value',
    })
    @Column({
        type: 'enum',
        enum: RoleTypes,
        unique: true,
    })
    readonly value: RoleTypes;

    @ApiProperty({ example: 'About role', description: 'Description role' })
    @Column({ type: 'varchar', length: 500, nullable: false })
    readonly description: string;

    @ManyToMany(() => UserEntity, ({ roles }): RoleEntity[] => roles)
    readonly users: Relation<UserEntity[]>;

    constructor(partialData: Partial<RoleEntity>) {
        super();
        Object.assign(this, partialData);
    }
}
