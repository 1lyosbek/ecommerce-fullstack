import { ResData } from "src/lib/resData";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IUserEntityCount } from "./user.repository";

export interface IUserService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IUserEntityCount>>; 
    findOne(id: number): Promise<ResData<UserEntity>>;
    findByUserName(username: string): Promise<ResData<UserEntity | undefined>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<ResData<UserEntity>>;
    remove(id: number): Promise<ResData<UserEntity>>;
}