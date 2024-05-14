import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ICreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from './entities/product.entity';
import { fileOptions } from 'src/lib/fileOpitions';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
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
    required: false,
    type: Number,
    description: 'For limit'
  })
  @ApiQuery({
    name: 'count',
    required: false,
    type: Number,
    description: 'For count'
  })
  @Get()
  async findAll(@Query('limit') limit: number, @Query('count') count: number) {
    let limitt: number;
    if (!(limit && count)) {
      limitt = 10
    }
    return await this.productsService.findAll(limitt);
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(+id, updateProductDto);
  }
  @Auth(RoleEnum.OWNER)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundProduct } = await this.productsService.findOne(id);
    return this.productsService.remove(foundProduct);
  }
}
