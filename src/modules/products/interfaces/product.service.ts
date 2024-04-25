import { ResData } from "src/lib/resData";
import { ICreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductEntity } from "../entities/product.entity";

export interface IProductService {
    findOne(id: number): Promise<ResData<ProductEntity>>;
    findAll(limit: number): Promise<ResData<ProductEntity[]>>;
    create(files: Array<Express.Multer.File>, createProductDto: ICreateProductDto): Promise<ResData<ProductEntity>>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<ResData<ProductEntity>>;
    remove(entity: ProductEntity): Promise<ResData<ProductEntity>>;
}