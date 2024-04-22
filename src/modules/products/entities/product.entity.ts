import { RoleEnum } from 'src/common/enums/enums';
import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("products")
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "title", type: "varchar", nullable: false, unique: true})
    title: string;

    @Column({ type: "numeric", nullable: false })
    price: number;

    @Column({ name: "old_price", type: "numeric", nullable: true})
    oldPrice: number;

    @Column({ name: "category", type: "varchar", nullable: false})
    category: string;

    @Column({ name: "units", type: "varchar", nullable: false })
    units: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "urls", type: "varchar", nullable: false })
    urls: Array<string>;

    @Column({ name: "info", type: "json", nullable: false })
    info: Object;

    @Column({ name: "available", type: "boolean", nullable: false })
    available: boolean;

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

