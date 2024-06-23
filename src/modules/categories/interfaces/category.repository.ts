import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
    getById(id: number): Promise<CategoryEntity>;
    getAll(): Promise<CategoryEntity[]>;
    getByTitle(title: string): Promise<CategoryEntity | null>; 
    create(entity: CategoryEntity): Promise<CategoryEntity>;
    update(entity: CategoryEntity): Promise<CategoryEntity>;
    delete(entity: CategoryEntity): Promise<CategoryEntity>;
}