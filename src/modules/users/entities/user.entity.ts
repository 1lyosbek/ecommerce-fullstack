import { RoleEnum } from 'src/common/enums/enums';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "first_name", type: "varchar", nullable: false })
    FirstName: string;

    @Column({ name: "last_name", type: "varchar", nullable: false })
    LastName: string;

    @Column('text', { name: "phones", array: true, nullable: false })
    phones: Array<string>;
    
    @Column({ name: "role", type: "enum", enum: ['admin', 'user', 'owner'], nullable: false })
    role: RoleEnum;

    @Column({ name: "username", type: "varchar", unique: true, nullable: false })
    UserName: string;

    @Column({ name: "password", type: "varchar", nullable: false })
    password: string;

    @Column({ name: "is_active", type: "boolean", nullable: false })
    isActive: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
    })
    CreatedAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false,
    })
    UpdatedAt: Date;
}

