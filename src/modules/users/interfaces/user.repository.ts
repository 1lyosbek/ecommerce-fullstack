import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    getById(id: number): Promise<UserEntity>;
    getAll(word: string, limit: number, offset: number): Promise<IUserEntityCount>;
    getByUserName(UserName: string): Promise<UserEntity | undefined>;
    create(entity: UserEntity): Promise<UserEntity>;
    update(entity: UserEntity): Promise<UserEntity>;
    delete(entity: UserEntity): Promise<UserEntity>;
}

export interface IUserEntityCount {
    users: UserEntity[];
    count: number;
}