import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserQueryDto } from './dto/dquery-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly log: Logger,
  ) {}

  @ApiOperation({ summary: '유저 생성', description: '유저 생성을 합니다.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.log.log(`createUserDto: ${JSON.stringify(createUserDto)}`);
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: '유저 전체 조회',
    description: '유저 전체를 조회합니다.',
  })
  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: '유저 조회 1',
    description: '유저id를 가지고 유저 한명을 조회합니다.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: '유저 조회 1~n',
    description:
      '쿼리로 유저 정보를 받아서 그에 해당하는 유저 리스트를 반환합니다.',
  })
  @Get()
  async getUsers(@Query() query: UserQueryDto) {
    this.log.log(`[UsersController] query: ${JSON.stringify(query)}`);
    return await this.usersService.findUsersByDQuery(query);
  }

  @ApiOperation({
    summary: '유저 업데이트',
    description: '유저id를 가지고 유저 한명을 업데이트합니다.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: '유저 삭제',
    description: '유저id를 가지고 유저 한명을 삭제합니다.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({
    summary: '유저 soft 삭제',
    description:
      '유저id를 가지고 유저 한명을 soft 삭제합니다. 실제로 삭제되지 않습니다. deleteAt이 업데이트 됩니다.',
  })
  @Delete('soft/:id')
  softRemove(@Param('id') id: string) {
    return this.usersService.softRemove(+id);
  }
}
