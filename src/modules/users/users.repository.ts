import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { ILike, Repository } from "typeorm";
import { IUserEntityCount, IUserRepository } from "./interfaces/user.repository";
import { RoleEnum } from "src/common/enums/enums";
 
export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async getAll(word: string, limit: number, offset: number): Promise<IUserEntityCount> {
        let whereCondition = {};
        if (word && word.trim() !== "") {
            whereCondition = { role: RoleEnum.USER, UserName: ILike(`%${word}%`) };
            const foundUsers = await this.repository.find({ skip: offset, take: limit, where: whereCondition });
            const count = foundUsers.length;
            return { users: foundUsers, count }
        } else {
            const f = await this.repository.find({ where: { role: RoleEnum.USER } });
            const foundUsers = await this.repository.find({ skip: offset, take: limit, where: { role: RoleEnum.USER }, select: ["FirstName", "LastName", "CreatedAt", "UpdatedAt", "id", "isActive", "phones", "role"] });
            const count = f.length;
            return { users: foundUsers, count: count };
        }
    }
    async getById(id: number): Promise<UserEntity> {
        return await this.repository.findOneBy({id});
    }
    async getByUserName(UserName: string): Promise<UserEntity | undefined> {
        return await this.repository.findOneBy({UserName});
    }
    async update(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.save(entity);
    }
    async delete(entity: UserEntity): Promise<UserEntity> {
        return await this.repository.remove(entity);
    }
    async create(data: UserEntity): Promise<UserEntity> {
        return await this.repository.save(data);
    }
}