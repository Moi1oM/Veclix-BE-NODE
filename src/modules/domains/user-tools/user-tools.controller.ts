import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserToolsService } from './user-tools.service';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';

@Controller('user-tools')
export class UserToolsController {
  constructor(private readonly userToolsService: UserToolsService) {}

  @Post()
  create(@Body() createUserToolDto: CreateUserToolDto) {
    return this.userToolsService.create(createUserToolDto);
  }

  @Get()
  findAll() {
    return this.userToolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userToolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserToolDto: UpdateUserToolDto) {
    return this.userToolsService.update(+id, updateUserToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userToolsService.remove(+id);
  }
}
