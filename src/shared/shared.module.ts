import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/users.repository';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UsersService}
  ],
  exports: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide : "IUserService", useClass: UsersService}
],
})
export class SharedModule {}
