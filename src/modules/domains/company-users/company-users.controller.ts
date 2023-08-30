import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyUsersService } from './company-users.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';

@Controller('company-users')
export class CompanyUsersController {
  constructor(private readonly companyUsersService: CompanyUsersService) {}

  @Post()
  create(@Body() createCompanyUserDto: CreateCompanyUserDto) {
    return this.companyUsersService.create(createCompanyUserDto);
  }

  @Get()
  findAll() {
    return this.companyUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyUserDto: UpdateCompanyUserDto) {
    return this.companyUsersService.update(+id, updateCompanyUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyUsersService.remove(+id);
  }
}
