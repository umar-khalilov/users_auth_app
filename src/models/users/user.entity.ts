import { Column, Entity, JoinTable, ManyToMany, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../abstract/abstract.entity';
import { RoleEntity } from '../roles/role.entity';
import { AddressDto } from './dto/address.dto';
import { CompanyDto } from './dto/company.dto';
import { ApiRelation } from '@/common/decorators/api-relation.decorator';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The full name of user',
    })
    @Column({ type: 'varchar', length: 450, nullable: false })
    readonly name!: string;

    @ApiProperty({
        example: 'Bret',
        description: 'The username of user',
    })
    @Column({ type: 'varchar', length: 300, nullable: false })
    readonly username!: string;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of user',
        format: 'email',
    })
    @Column({ type: 'varchar', unique: true, length: 350, nullable: false })
    readonly email!: string;

    @Column({
        type: 'text',
        name: 'password_hash',
        select: false,
        nullable: false,
    })
    readonly password: string;

    @ApiProperty({ example: AddressDto, description: 'Address of the user' })
    @Column({ type: 'jsonb', nullable: true })
    readonly address: AddressDto | undefined;

    @ApiProperty({
        example: '1-770-736-8031 x56442',
        description: 'The phone number of user',
    })
    @Column({ type: 'varchar', length: 22, nullable: true })
    readonly phone: string | undefined;

    @ApiProperty({
        example: 'hildegard.org',
        description: 'The website of user',
    })
    @Column({ type: 'varchar', length: 300, nullable: true })
    readonly website: string | undefined;

    @ApiProperty({ example: CompanyDto, description: 'Company of the user' })
    @Column({ type: 'jsonb', nullable: true })
    readonly company: CompanyDto | undefined;

    @ApiRelation()
    @ManyToMany(() => RoleEntity, ({ users }): UserEntity[] => users, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'users_roles',
        joinColumn: {
            name: 'users',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roles',
            referencedColumnName: 'id',
        },
    })
    readonly roles!: Relation<RoleEntity[]>;

    constructor(partialData: Partial<UserEntity>) {
        super();
        Object.assign(this, partialData);
    }
}
