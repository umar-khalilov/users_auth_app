import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from '../abstract/abstract.entity';
import { AddressDto } from './dto/address.dto';
import { CompanyDto } from './dto/company.dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The full name of user',
    })
    @Column({ type: 'varchar2', length: 450, nullable: false })
    readonly fullName: string | undefined;

    @ApiProperty({
        example: 'Bret',
        description: 'The username of user',
    })
    @Column({ type: 'varchar2', length: 300, nullable: false })
    readonly userName: string | undefined;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of user',
    })
    @Column({ type: 'varchar2', unique: true, length: 350, nullable: false })
    readonly email: string | undefined;

    @Exclude()
    @Column({ type: 'text', name: 'password_hash', nullable: false })
    readonly password: string | undefined;

    @ApiProperty({ example: AddressDto, description: 'Address of the user' })
    @Column({ type: 'jsonb', nullable: true })
    readonly address: AddressDto | undefined;

    @ApiProperty({
        example: '1-770-736-8031 x56442',
        description: 'The phone number of user',
    })
    @Column({ type: 'varchar2', length: 20, nullable: true })
    readonly phone: string | undefined;

    @ApiProperty({
        example: 'hildegard.org',
        description: 'The website of user',
    })
    @Column({ type: 'varchar2', length: 300, nullable: true })
    readonly website: string | undefined;

    @ApiProperty({ example: CompanyDto, description: 'Company of the user' })
    @Column({ type: 'jsonb', nullable: true })
    readonly company: CompanyDto | undefined;

    constructor(partialData: Partial<UserEntity>) {
        super();
        Object.assign(this, partialData);
    }
}
