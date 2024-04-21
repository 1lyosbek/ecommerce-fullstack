import { ResData } from "src/lib/resData";
import { CategoryEntity } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

export interface ICategoryService{
    findAll(): Promise<ResData<CategoryEntity[]>>;
    findOne(id: number): Promise<ResData<CategoryEntity>>;
    findByTitle(title: string): Promise<ResData<CategoryEntity | undefined>>;
    create(createCategoryDto: CreateCategoryDto): Promise<ResData<CategoryEntity>>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResData<CategoryEntity>>;
    remove(entity: CategoryEntity): Promise<ResData<CategoryEntity>>;
}