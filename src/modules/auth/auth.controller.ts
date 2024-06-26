import { Controller, Post, Body, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserNameAlreadyExist, UserNameOrPasswordWrongException } from './exception/auth.exception';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';
import { AdminService } from '../admin/admin.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject("IUserService") private readonly userService: UsersService,
    @Inject("IAdminService") private readonly adminService: AdminService,
    private readonly authService: AuthService
    ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  
  @Post('user/sign-up')
  async registerUser(@Body() createDto: RegisterDto) {  
    const { data: foundUser } = await this.userService.findByUserName(
      createDto.UserName,
    );

    if (foundUser) {
      throw new UserNameAlreadyExist();
    } 
    return await this.authService.registerUser(createDto);
  }
  @Auth(RoleEnum.OWNER)
  @Post('admin/sign-up')
  async registerAdmin(@Body() createDto: RegisterDto) {  
    const { data: foundUser } = await this.adminService.findByUserName(
      createDto.UserName,
    );

    if (foundUser) {
      throw new UserNameAlreadyExist();
    } 
    return await this.authService.registerAdmin(createDto);
  }
}
