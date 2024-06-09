import { Injectable } from '@nestjs/common';
import { ICreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './interfaces/product.service';
import { ResData } from 'src/lib/resData';
import { ProductEntity } from './entities/product.entity';
import { ProductNotFoundException } from './exceptions/product.exceptions';
import { ProductRepository } from './products.repository';
import { IProductEntityCount } from './interfaces/product.repository';

@Injectable()
export class ProductsService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(files: Array<Express.Multer.File>, createProductDto: ICreateProductDto):Promise<ResData<ProductEntity>> {
    const  newProduct = new ProductEntity();
    const paths = [];
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      element.path = `https://ecommerceapi.firdavsdev.uz/${element.path}`
      paths.push(element.path);
    }
    newProduct.title = createProductDto.title;
    newProduct.price = createProductDto.price;
    newProduct.oldPrice = createProductDto.oldPrice;
    newProduct.category = createProductDto.category;
    newProduct.units = createProductDto.units;
    newProduct.description = createProductDto.description;
    newProduct.info = createProductDto.info;
    newProduct.available = true;
    newProduct.urls = paths;
    const createdProduct = await this.productRepository.create(newProduct);
    return new ResData<ProductEntity>("success", "product created successfully", 201, createdProduct);
  }

  async findAll(word: string, limit: number, page: number): Promise<ResData<IProductEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundProducts = await this.productRepository.getAll(word, limit, page);
    return new ResData<IProductEntityCount>("success", "products", 200, { products: foundProducts.products, count: foundProducts.count});
  }

  async findOne(id: number): Promise<ResData<ProductEntity>> {
    const foundProduct = await this.productRepository.getById(id);
    if (!foundProduct) {
      throw new ProductNotFoundException();
    }
    console.log(foundProduct.urls);
    return new ResData<ProductEntity>("success", "product found", 200, foundProduct);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ResData<ProductEntity>> {
    const {data: foundProduct }  = await this.findOne(id);
    foundProduct.title = updateProductDto.title
    foundProduct.price = updateProductDto.price
    foundProduct.oldPrice = updateProductDto.oldPrice
    foundProduct.category = updateProductDto.category
    foundProduct.units = updateProductDto.units
    foundProduct.description = updateProductDto.description
    foundProduct.info = updateProductDto.info
    const updatedProduct = await this.productRepository.update(foundProduct);
    return new ResData<ProductEntity>("success", "product updated", 200, updatedProduct);
  }

  async remove(entity: ProductEntity): Promise<ResData<ProductEntity>> {
    const deletedProduct = await this.productRepository.delete(entity);
    return new ResData<ProductEntity>("success", "product deleted", 200, deletedProduct);
  }
}
