import { InjectRepository } from "@nestjs/typeorm";
import { IProductEntityCount, IProductRepository } from "./interfaces/product.repository";
import { ILike, Repository } from "typeorm";
import { ProductEntity } from "./entities/product.entity";

export class ProductRepository implements IProductRepository{
    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {}
    async getAll(word: string, limit: number, offset: number): Promise<IProductEntityCount> {
        let whereCondition = {};
        if (word && word.trim() !== "") {
            whereCondition = { title: ILike(`%${word}%`) };
            const foundProducts = await this.repository.find({ skip: offset, take: limit, where: whereCondition });
            const count = foundProducts.length;
            return { products: foundProducts, count }
        } else {
            const f = await this.repository.find();
            const foundProducts = await this.repository.find({ skip: offset, take: limit });
            const count = f.length;
            return { products: foundProducts, count: count };
        }
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