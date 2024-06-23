import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { IAdminEntityCount, IAdminRepository } from "./interfaces/repository-interface";
import { RoleEnum } from "src/common/enums/enums";
import { UserEntity } from "../users/entities/user.entity";

export class AdminRepository implements IAdminRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async createAdmin(admin: UserEntity): Promise<UserEntity> {
        return await this.repository.save(admin);
    }
    async getAdmins(word: string, limit: number, offset: number): Promise<IAdminEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { role: RoleEnum.ADMIN, UserName: ILike(`%${word}%`) };
            const foundAdmins = await this.repository.find({ skip: offset, take: limit, where: whereCondition });
            const count = foundAdmins.length;
            return { admins: foundAdmins, count }
        } else {
            const f = await this.repository.find({where: {role: RoleEnum.ADMIN}});
            const foundAdmins = await this.repository.find({ skip: offset, take: limit, where: {role: RoleEnum.ADMIN} });
            const count = f.length;
            return { admins: foundAdmins, count: count};
        }
    }
    async getAdmin(id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({id:id, role: RoleEnum.ADMIN});
    }
    async getAdminByUserName (userName: string): Promise<UserEntity> {
        return await this.repository.findOne({where: {UserName: userName, role: RoleEnum.ADMIN}});
    }
    async updateAdmin(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async deleteAdmin(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.remove(entity);
    }
}