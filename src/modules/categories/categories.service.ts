import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryService } from './interfaces/category.service';
import { CategoryEntity } from './entities/category.entity';
import { ResData } from 'src/lib/resData';
import { CategoryRepository } from './categories.repository';
import { CategoryNotFoundException } from './exceptions/category.exceptions';

@Injectable()
export class CategoriesService implements ICategoryService{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto):Promise<ResData<CategoryEntity>> {
    const newCategory = new CategoryEntity();
    newCategory.title = createCategoryDto.title;
    const created = await this.categoryRepository.create(newCategory);
    return new ResData<CategoryEntity>("success", "Category created successfully", 201, created);
  }

  async findAll():Promise<ResData<CategoryEntity[]>> {
    const foundCategories = await this.categoryRepository.getAll();
    return new ResData<CategoryEntity[]>("success", "All Categories", 200, foundCategories);
  }

  async findByTitle(title: string): Promise<ResData<CategoryEntity>> {
    const foundCategoryByTitle = await this.categoryRepository.getByTitle(title);
    const resData = new ResData<CategoryEntity | null>("success", "category found by title", 200, foundCategoryByTitle);
    if (!foundCategoryByTitle) {
      resData.variant = "error";
      resData.message = "category not found";
      resData.statusCode = 404;
    }
    return resData;
  }

  async findOne(id: number): Promise<ResData<CategoryEntity>> {
    const foundCategory = await this.categoryRepository.getById(id);
    if (!foundCategory) {
      throw new CategoryNotFoundException()
    }
    return new ResData<CategoryEntity>("success", "category found", 200, foundCategory);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<ResData<CategoryEntity>> {
    const {data: foundCategory} = await this.findOne(id);
    foundCategory.title = updateCategoryDto.title;
    const updatedCategory = await this.categoryRepository.update(foundCategory);
    return new ResData<CategoryEntity>("success", "category updated successfully", 200, updatedCategory);
  }

  async remove(entity: CategoryEntity):Promise<ResData<CategoryEntity>> {
    const deletedCategory = await this.categoryRepository.delete(entity);
    return new ResData<CategoryEntity>("success", "category deleted successfully", 200, deletedCategory);
  }
}
