import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { ICategoryRepository } from "./interfaces/category.repository";
import { Repository } from "typeorm";

export class CategoryRepository implements ICategoryRepository{
    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) {}
    async getAll(): Promise<CategoryEntity[]> {
        return await this.repository.find();
    }
    async getById(id: number): Promise<CategoryEntity> {
        return await this.repository.findOneBy({id});
    }
    async create(data: CategoryEntity): Promise<CategoryEntity> {
        return await this.repository.save(data);
    }
    async update(data: CategoryEntity): Promise<CategoryEntity> {
        return await this.repository.save(data);
    }
    async delete(data: CategoryEntity): Promise<CategoryEntity> {
        return await this.repository.remove(data);
    }
    async getByTitle(title: string): Promise<CategoryEntity | null> {
        return await this.repository.findOneBy({title});
    } 
}