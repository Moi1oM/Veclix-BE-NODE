import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserToolsService } from './user-tools.service';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';

@ApiTags('user-tools')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
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
    return this.userToolsService.findOneByIdOrException(+id);
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
