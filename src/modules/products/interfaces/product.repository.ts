import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository{
    getById(id: number): Promise<ProductEntity>;
    getAll(limit: number): Promise<ProductEntity[]>;
    getByTitle(title: string): Promise<ProductEntity>;
    create(entity: ProductEntity): Promise<ProductEntity>;
    update(entity: ProductEntity): Promise<ProductEntity>;
    delete(entity: ProductEntity): Promise<ProductEntity>;
}