import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ICreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from './entities/product.entity';
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
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: ICreateProductDto) {
    console.log(files);
    return await this.productsService.create(files, dto);
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
  async findAll(@Query('limit', ParseIntPipe) limit: number, @Query('count', ParseIntPipe) count: number,) {
    const limitt = count * limit
    return await this.productsService.findAll(limitt);
  }
  @Get('')
  async findByCategory(@Query('limit', ParseIntPipe) limit: number, @Query('count', ParseIntPipe) count: number,) {
    const limitt = count * limit
    return await this.productsService.findAll(limitt);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundProduct } = await this.productsService.findOne(id);
    return this.productsService.remove(foundProduct);
  }
}
