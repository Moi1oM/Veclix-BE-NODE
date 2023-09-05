import { Injectable } from '@nestjs/common';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyUser } from './entities/company-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyUsersService {
  constructor(
    @InjectRepository(CompanyUser)
    private readonly companyUserRepository: Repository<CompanyUser>,
  ) {}

  async findOneByEmailOrCreate(email: string): Promise<CompanyUser> {
    const companyUser = await this.companyUserRepository.findOne({
      where: { email: email },
    });
    if (!companyUser) {
      const newCompanyUser = new CompanyUser(email);
      const createdCompanyUser = await this.companyUserRepository.save(
        newCompanyUser,
      );
      return createdCompanyUser;
    }
  }

  async create(
    createCompanyUserDto: CreateCompanyUserDto,
  ): Promise<CompanyUser> {
    return await this.companyUserRepository.save(createCompanyUserDto);
  }

  async findAll(): Promise<CompanyUser[]> {
    return await this.companyUserRepository.find();
  }

  async findOneByIdOrException(id: number): Promise<CompanyUser> {
    const companyUser = await this.companyUserRepository.findOne({
      where: { id: id },
    });
    if (!companyUser) {
      throw new Error('Company user not found');
    }
    return companyUser;
  }

  async update(
    id: number,
    updateCompanyUserDto: UpdateCompanyUserDto,
  ): Promise<CompanyUser> {
    await this.findOneByIdOrException(id);
    await this.companyUserRepository.update(id, updateCompanyUserDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: number): Promise<CompanyUser> {
    const companyUser = await this.findOneByIdOrException(id);
    await this.companyUserRepository.delete(id);
    return companyUser;
  }
}
