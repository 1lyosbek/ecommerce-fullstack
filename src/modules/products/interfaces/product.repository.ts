import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository{
    getById(id: number): Promise<ProductEntity>;
    getAll(word: string, limit: number, offset: number): Promise<IProductEntityCount>;
    getByTitle(title: string): Promise<ProductEntity>;
    create(entity: ProductEntity): Promise<ProductEntity>;
    update(entity: ProductEntity): Promise<ProductEntity>;
    delete(entity: ProductEntity): Promise<ProductEntity>;
}

export interface IProductEntityCount {
    products: ProductEntity[];
    count: number;
}