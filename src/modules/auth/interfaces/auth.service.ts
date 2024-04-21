import { UserEntity } from '../../users/entities/user.entity';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { ResData } from 'src/lib/resData';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IAuthService {
  login(data: LoginDto): Promise<ResData<ILoginData>>;
  register(data: RegisterDto): Promise<ResData<ILoginData>>;
}
