import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyUsersService } from './company-users.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('company-users')
@Controller('v1/company-users')
export class CompanyUsersController {
  constructor(private readonly companyUsersService: CompanyUsersService) {}

  @ApiOperation({
    deprecated: true,
    summary: 'Create a new company user',
    description: 'Create a new company user',
  })
  @Post()
  async create(@Body() createCompanyUserDto: CreateCompanyUserDto) {
    return await this.companyUsersService.create(createCompanyUserDto);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'Get all company users',
    description:
      'Get all company users. This is a deprecated endpoint. It has not to be used.',
  })
  @Get('all')
  async findAll() {
    return await this.companyUsersService.findAll();
  }

  @ApiOperation({
    summary: 'Get company user',
    description: 'Get company user by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companyUsersService.findOneByIdOrException(+id);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'Update company user',
    description: 'Update company user by id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyUserDto: UpdateCompanyUserDto,
  ) {
    return await this.companyUsersService.update(+id, updateCompanyUserDto);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'Delete company user',
    description: 'Delete company user by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companyUsersService.remove(+id);
  }
}
