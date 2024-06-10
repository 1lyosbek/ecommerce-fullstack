import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  controllers: [AdminController],
  providers: [
   {provide: "IAdminService", useClass: AdminService},
   {provide: "IAdminRepository", useClass: AdminRepository}
  ],
})
export class AdminModule {}
