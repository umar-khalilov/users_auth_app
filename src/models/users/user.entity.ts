import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    Relation,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HashService } from '@/common/services/hashes/hash.service';
import { AbstractEntity } from '../abstract/abstract.entity';
import { AddressDto } from './dto/address.dto';
import { CompanyDto } from './dto/company.dto';
import { RoleEntity } from '../roles/role.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The full name of user',
    })
    @Column({ type: 'varchar', length: 450, nullable: false })
    readonly name: string | undefined;

    @ApiProperty({
        example: 'Bret',
        description: 'The username of user',
    })
    @Column({ type: 'varchar', length: 300, nullable: false })
    readonly username: string | undefined;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of user',
        format: 'email',
    })
    @Column({ type: 'varchar', unique: true, length: 350, nullable: false })
    readonly email: string | undefined;

    @Exclude({ toPlainOnly: true })
    @Column({ type: 'text', name: 'password_hash', nullable: false })
    password: string | undefined;

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
    readonly roles: Relation<RoleEntity[]> = [];

    constructor(
        partialData: Partial<UserEntity>,
        private readonly hashService: HashService,
    ) {
        super();
        Object.assign(this, partialData);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (!!this.password) {
            this.password = await this.hashService.hashPassword(this.password);
        }
    }
}
