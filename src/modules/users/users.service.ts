import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service';
import { ResData } from 'src/lib/resData';
import { UserEntity } from './entities/user.entity';
import { IUserEntityCount, IUserRepository } from './interfaces/user.repository';
import { UserNotFoundException } from './exceptions/user.exceptions';

@Injectable()
export class UsersService implements IUserService {
  constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository){}
  async findAll(word: string, limit: number, page: number): Promise<ResData<IUserEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundUsers = await this.userRepository.getAll(word, limit, page);
    return new ResData<IUserEntityCount>("success", "all users", 200, {users: foundUsers.users, count: foundUsers.count});
  }

  async findOne(id: number): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.getById(id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return new ResData<UserEntity>("success", "found user", 200, foundUser);
  }
  async findByUserName(username: string): Promise<ResData<UserEntity | undefined>> {
    const foundUser = await this.userRepository.getByUserName(username);
    const resData = new ResData<UserEntity | undefined>("success", "found user", 200, foundUser);
    if (!foundUser) {
      resData.variant = "error";
      resData.message = "user not found";
      resData.statusCode = 404;
    }
    return resData;
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.getById(id);
    const update =  Object.assign(foundUser, updateUserDto);
    const updatedUser = await this.userRepository.update(update);
    return new ResData<UserEntity>("success", " user updated successfully", HttpStatus.OK, updatedUser);
  }

  async remove(id: number): Promise<ResData<UserEntity>> {
    const foundUser = await this.userRepository.getById(id);
    const deletedUser = await this.userRepository.delete(foundUser);
    return new ResData<UserEntity>("success", " user deleted successfully", HttpStatus.OK, deletedUser);
  }
}
