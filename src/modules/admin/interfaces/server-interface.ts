import { ResData } from "src/lib/resData";
import { UpdateAdminDto } from "../dto/update-admin.dto";
import { IAdminEntityCount } from "./repository-interface";
import { UserEntity } from "src/modules/users/entities/user.entity";

export interface IAdminService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IAdminEntityCount>>;
    findOne(id: number): Promise<ResData<UserEntity>>;
    update(id: number, admin: UpdateAdminDto): Promise<ResData<UserEntity>>;
    remove(entity: UserEntity): Promise<ResData<UserEntity>>;
}