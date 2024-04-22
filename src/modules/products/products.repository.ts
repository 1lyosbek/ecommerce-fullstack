import { InjectRepository } from "@nestjs/typeorm";
import { IProductRepository } from "./interfaces/product.repository";
import { Repository } from "typeorm";
import { ProductEntity } from "./entities/product.entity";

export class ProductRepository implements IProductRepository{
    constructor(@InjectRepository(ProductRepository) private repository: Repository<ProductEntity>) {}
    async getAll(limit: number): Promise<ProductEntity[]> {
        return await this.repository.find({take: limit});
    }
    async getById(id: number): Promise<ProductEntity> {
        return await this.repository.findOneBy({id});
    }
    async getByTitle(title: string): Promise<ProductEntity> {
        return await this.repository.findOneBy({title});
    } 
    async create(entity: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(entity);
    }
    async update(entity: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(entity);
    }
    async delete(entity: ProductEntity): Promise<ProductEntity> {
        return await this.repository.remove(entity);
    }
}