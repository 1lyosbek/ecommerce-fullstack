import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdminService } from './interfaces/server-interface';
import { IAdminEntityCount, IAdminRepository } from './interfaces/repository-interface';
import { ResData } from 'src/lib/resData';
import { AdminNotFound } from './exceptions/admin.exceptions';
import { hashed } from 'src/lib/bcrypt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AdminService implements IAdminService {
  constructor(@Inject("IAdminRepository") private readonly adminRepository: IAdminRepository) {}
  async findAll(word: string, limit: number, page: number): Promise<ResData<IAdminEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundAdmins = await this.adminRepository.getAdmins(word, limit, page);
    return new ResData<IAdminEntityCount>("success","All available admins", 200, {admins: foundAdmins.admins, count: foundAdmins.count});
  }

  async findOne(id: number): Promise<ResData<UserEntity>>{
    const foundAdmin = await this.adminRepository.getAdmin(id);
    if (!foundAdmin) {
      throw new AdminNotFound();
    }
    return new ResData<UserEntity>("success","Admin found", 200, foundAdmin);
  }

  async findByUserName(userName: string): Promise<ResData<UserEntity>>{
    const foundAdmin = await this.adminRepository.getAdminByUserName(userName);
    const resData = new ResData<UserEntity>("success", "Admin found by phone number", 200, foundAdmin);
    if (!foundAdmin) {
      resData.variant = "warning";
      resData.message = "admin not found by number";
      resData.statusCode = 404; 
    }
    return resData;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<ResData<UserEntity>> {
    const {data: foundAdmin } = await this.findOne(id);
    foundAdmin.FirstName = updateAdminDto.FirstName;
    foundAdmin.LastName = updateAdminDto.LastName;
    foundAdmin.phones = updateAdminDto.phones;
    foundAdmin.UserName = updateAdminDto.UserName;
    foundAdmin.isActive = updateAdminDto.isActive;
    foundAdmin.password =  await hashed(updateAdminDto.password);
    const updated = await this.adminRepository.updateAdmin(foundAdmin);
    return new ResData<UserEntity>("success", "Admin updated successfully", 200, updated);
  }

  async remove(entity: UserEntity): Promise<ResData<UserEntity>> {
    const deleted = await this.adminRepository.deleteAdmin(entity);
    return new ResData<UserEntity>("success","Admin deleted successfully", 200, deleted);
  }
}
