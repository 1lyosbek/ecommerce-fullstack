import { Injectable } from '@nestjs/common';
import { ICreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './interfaces/product.service';
import { ResData } from 'src/lib/resData';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService implements IProductService {
  async create(createProductDto: ICreateProductDto):Promise<ResData<ProductEntity>> {
    const  newProduct = new ProductEntity();
    newProduct.title = createProductDto.title;
    newProduct.price = createProductDto.price;
    newProduct.oldPrice = createProductDto.oldPrice;
    newProduct.category = createProductDto.category;
    newProduct.units = createProductDto.units;
    newProduct.description = createProductDto.description;
    throw new Error();
  }

  async findAll(limit: number):Promise<ResData<ProductEntity[]>> {
    throw new Error();
  }

  async findOne(id: number): Promise<ResData<ProductEntity>> {
    throw new Error();
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ResData<ProductEntity>> {
    throw new Error();
  }

  async remove(entity: ProductEntity): Promise<ResData<ProductEntity>> {
    throw new Error();
  }
}
