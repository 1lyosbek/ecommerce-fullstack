import { Controller, Post, Body, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserNameAlreadyExist, UserNameOrPasswordWrongException } from './exception/auth.exception';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject("IUserService") private readonly userService: UsersService,
    private readonly authService: AuthService
    ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  
  @Auth(RoleEnum.OWNER)
  @Post('sign-up')
  async register(@Body() createDto: RegisterDto) {  
    const { data: foundUser } = await this.userService.findByUserName(
      createDto.UserName,
    );

    if (foundUser) {
      throw new UserNameAlreadyExist();
    } 
    return await this.authService.register(createDto);
  }
}
