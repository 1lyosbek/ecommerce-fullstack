import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserNameOrPasswordWrongException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { UserRepository } from '../users/users.repository';
import { hashed, compare } from 'src/lib/bcrypt';
import { RoleEnum } from 'src/common/enums/enums';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IUserService") private readonly userService: UsersService,
    @Inject("IUserRepository") private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findByUserName(
      dto.UserName,
    );

    if (!foundUser) {
      throw new UserNameOrPasswordWrongException();
    }

    const compared = await compare(dto.password, foundUser.password);
    if (!compared) {
      throw new UserNameOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('succes', "user successfully logged in", HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {
    dto.password = await hashed(dto.password);
    const newUser = new UserEntity();
    newUser.FirstName = dto.FirstName;
    newUser.LastName = dto.LastName;
    newUser.phones = dto.phones;
    newUser.role = RoleEnum.USER;
    newUser.UserName = dto.UserName;
    newUser.password = dto.password;
    newUser.isActive = true;
    const savedUser = await this.userRepository.create(newUser);

    const token = await this.jwtService.signAsync({ id: savedUser.id });

    return new ResData<ILoginData>('success', "user created successfully", HttpStatus.CREATED, {
      user: savedUser,
      token,
    });
  }
}
