import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { IUserRepository } from "./interfaces/user.repository";
import { RoleEnum } from "src/common/enums/enums";
 
export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}
    async getAll(): Promise<UserEntity[]> {
        return await this.repository.find({where: {role: RoleEnum.USER}, select: ["FirstName", "LastName", "CreatedAt", "UpdatedAt", "id", "isActive", "phones", "role"]});
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