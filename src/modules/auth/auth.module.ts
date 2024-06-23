import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/shared/shared.module';
import { AdminService } from '../admin/admin.service';
import { AdminRepository } from '../admin/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    { provide: "IAdminService", useClass: AdminService },
    { provide: "IAdminRepository", useClass: AdminRepository }],
})
export class AuthModule {}
