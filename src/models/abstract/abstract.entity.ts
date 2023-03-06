import { ApiProperty } from '@nestjs/swagger';
import {
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class AbstractEntity extends BaseEntity {
    @ApiProperty({ example: 1, description: 'Primary key' })
    @PrimaryGeneratedColumn('increment')
    readonly id: number | undefined;

    @ApiProperty({
        example: new Date().toISOString(),
        description: 'Created at',
    })
    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at',
    })
    readonly createdAt: Date | undefined;

    @ApiProperty({
        example: new Date().toISOString(),
        description: 'Updated at',
    })
    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at',
    })
    readonly updatedAt: Date | undefined;
}
