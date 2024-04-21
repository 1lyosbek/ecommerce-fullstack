import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "title", type: "varchar", nullable: false, unique: true })
    title: string;
}
