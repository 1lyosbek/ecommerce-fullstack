import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CategoryAlreadyExist } from './exceptions/category.exceptions';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('category')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const foundCategoryByTitle = await this.categoriesService.findByTitle(createCategoryDto.title);
    if (foundCategoryByTitle.data) {
      throw new CategoryAlreadyExist();
    }
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }
  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const {data: foundCategory} = await this.categoriesService.findOne(id);
    return this.categoriesService.remove(foundCategory);
  }
}
