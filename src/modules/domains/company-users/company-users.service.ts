import { Injectable } from '@nestjs/common';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';

@Injectable()
export class CompanyUsersService {
  create(createCompanyUserDto: CreateCompanyUserDto) {
    return 'This action adds a new companyUser';
  }

  findAll() {
    return `This action returns all companyUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyUser`;
  }

  update(id: number, updateCompanyUserDto: UpdateCompanyUserDto) {
    return `This action updates a #${id} companyUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyUser`;
  }
}
