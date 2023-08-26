import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';

@ApiTags('tags')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('tags')
export class TagsController {
  private readonly logger: Logger = new Logger('Tags');
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: '태그 생성', description: '태그를 생성합니다.' })
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    this.logger.log(`createTagDto: ${JSON.stringify(createTagDto)}`);
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({
    summary: '태그 조회',
    description: '모든 태그를 조회합니다.',
  })
  @Get('all')
  async findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({
    summary: '태그 조회',
    description:
      '태그를 쿼리로 가져온 이름 가지고 조회합니다. 조회해서 있으면 있는 태그를 돌려주고, 없으면 만들어서 돌려줍니다.',
  })
  @Get()
  async findOneOrCreate(@Query('name') name: string) {
    return this.tagsService.findOneOrCreate(name);
  }

  @ApiOperation({
    summary: '태그 삭제',
    description: '태그를 삭제합니다.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`delete id: ${id}`);
    return this.tagsService.remove(+id);
  }
}
