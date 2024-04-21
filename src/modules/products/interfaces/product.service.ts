import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    getById(id: number): Promise<ProductEntity>;
    getAll(): Promise<ProductEntity[]>;
    create(entity: ProductEntity): Promise<ProductEntity>;
    update(entity: ProductEntity): Promise<ProductEntity>;
    delete(entity: ProductEntity): Promise<ProductEntity>;
}