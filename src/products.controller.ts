import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './modules/products/products.service';
import { ICreateProductDto } from './modules/products/dto/create-product.dto';
import { UpdateProductDto } from './modules/products/dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from './modules/products/entities/product.entity';
import { fileOptions } from 'src/lib/fileOpitions';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        price: { type: "number" },
        oldPrice: { type: "number" },
        category: { type: "string" },
        units: { type: "string" },
        description: { type: "string" },
        info: {
          type: "object",
          properties: {
            type: { type: "string" },
            color: { type: "string" },
          },
        },
        ['files']: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 3, fileOptions))
  create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: ICreateProductDto) {
    console.log(files);
    console.log(dto);
  }
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'For limit'
  })
  @ApiQuery({
    name: 'count',
    required: true,
    type: Number,
    description: 'For count'
  })
  @Get()
  findAll(@Query('limit', ParseIntPipe) limit: number, @Query('count', ParseIntPipe) count: number,) {
    const limitt = count * limit
    return this.productsService.findAll(limitt);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    let a: ProductEntity;
    return this.productsService.remove(a);
  }
}
