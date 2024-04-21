import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide: "IUserService", useClass: UsersService }
  ],
  exports: [
  {provide : "IUserRepository", useClass: UserRepository},
  {provide: "IUserService", useClass: UsersService }
],
})
export class SharedModule {}
