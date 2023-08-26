import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ToolBlocksService } from './services/tool-blocks.service';
import { CreateToolBlockDto } from './dto/create-tool-block.dto';
import { UpdateToolBlockDto } from './dto/update-tool-block.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('tool-blocks')
@ApiBearerAuth('access-token을 통한 인증이 필요합니다.')
@UseGuards(BasicAuthGuard)
@Controller('tool-blocks')
export class ToolBlocksController {
  private readonly logger = new Logger('ToolBlock');
  constructor(private readonly toolBlocksService: ToolBlocksService) {}

  @ApiOperation({
    summary: 'toolBlock 생성',
    description: 'toolBlock을 생성합니다.',
  })
  @Post()
  async create(
    @Body() createToolBlockDto: CreateToolBlockDto,
    @CurrentUser() user: User,
  ) {
    this.logger.log(
      `createToolBlockDto: ${JSON.stringify(createToolBlockDto)}`,
      `user: ${JSON.stringify(user)}`,
    );
    return this.toolBlocksService.create(
      createToolBlockDto.toEntity(user),
      createToolBlockDto.tool_block_id,
    );
  }

  @ApiOperation({
    summary: 'toolBlock 전체 조회 N',
    description: 'toolBlock 전체를 조회합니다.',
  })
  @Get('all')
  async findAll() {
    return this.toolBlocksService.findAll();
  }

  @ApiOperation({
    summary: 'toolBlock 조회 1',
    description:
      'toolBlock id를 가지고 toolBlock 한개를 조회합니다. 해당하는 id가 없으면 400에러를 반환합니다.',
  })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.toolBlocksService.findOne(id);
  }

  @ApiOperation({
    summary: 'toolBlock 수정 1',
    description:
      'toolBlock id를 가지고 toolBlock 한개를 수정합니다. 해당하는 id가 없으면 400에러를 반환합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateToolBlockDto: UpdateToolBlockDto,
  ) {
    return this.toolBlocksService.update(id, updateToolBlockDto);
  }

  @ApiOperation({
    summary: 'toolBlock 삭제 1',
    description:
      'toolBlock id를 가지고 toolBlock 한개를 삭제합니다. 해당하는 id가 없으면 400에러를 반환합니다.',
  })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.toolBlocksService.remove(id);
  }

  @ApiOperation({
    summary: 'toolBlock 소프트 delete',
    description:
      'toolBlock id를 가지고 toolBlock 한개를 소프트 삭제합니다. 해당하는 id가 없으면 400에러를 반환합니다.',
  })
  @Delete('/soft/:id')
  async softDelete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.toolBlocksService.softDelete(id);
  }
}
