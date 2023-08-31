import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserToolsService } from './user-tools.service';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user-tools')
@Controller('user-tools')
export class UserToolsController {
  constructor(private readonly userToolsService: UserToolsService) {}

  @ApiOperation({
    deprecated: true,
  })
  @Post()
  create(@Body() createUserToolDto: CreateUserToolDto) {
    return this.userToolsService.create(createUserToolDto);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Get()
  findAll() {
    return this.userToolsService.findAll();
  }

  @ApiOperation({
    deprecated: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userToolsService.findOne(+id);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserToolDto: UpdateUserToolDto,
  ) {
    return this.userToolsService.update(+id, updateUserToolDto);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userToolsService.remove(+id);
  }
}
