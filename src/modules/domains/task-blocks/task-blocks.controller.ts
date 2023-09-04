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
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaskBlocksService } from './task-blocks.service';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { TaskBlockQuery } from './dto/dquery-task-block.dto';

@ApiTags('task-blocks')
@UseGuards(BasicAuthGuard)
@Controller('v1/task-blocks')
export class TaskBlocksController {
  private readonly logger = new Logger('TaskBlock');
  constructor(private readonly taskBlocksService: TaskBlocksService) {}

  @ApiOperation({
    summary: 'TaskBlock 생성',
    description: 'TaskBlock을 생성합니다.',
  })
  @Post()
  async create(
    @Body() createTaskBlockDto: CreateTaskBlockDto,
    @CurrentUser() user: User,
  ) {
    this.logger.log(
      `createTaskBlockDto: ${JSON.stringify(
        createTaskBlockDto,
      )}, user: ${JSON.stringify(user)}`,
    );
    return await this.taskBlocksService.create(
      createTaskBlockDto.toEntity(user),
      createTaskBlockDto.agent_uuid,
    );
  }

  @ApiOperation({
    summary: 'TaskBlock 조회 N',
    description: 'TaskBlock을 모두 조회합니다.',
  })
  @Get('/all')
  async findAll() {
    return this.taskBlocksService.findAll();
  }

  @ApiOperation({
    summary: 'TaskBlock 조회 1',
    description:
      'TaskBlock 1개를 id(uuid)를 가지고 조회합니다. 해당하는 TaskBlock이 없으면 400 에러를 반환합니다.',
  })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.taskBlocksService.findOne(id);
  }

  @ApiOperation({
    summary: 'TaskBlock 조회 1~n',
    description:
      'TaskBlock을 query를 통해서 조회합니다. 해당하는 TaskBlock이 없으면 400 에러를 반환합니다.',
  })
  @Get()
  async findTaskBlocksByDQuery(@Query() query: TaskBlockQuery) {
    return await this.taskBlocksService.findTaskBlocksByDQuery(query);
  }

  @ApiOperation({
    summary: 'TaskBlock 수정',
    description:
      'TaskBlock을 id를 가지고 수정합니다. id에 해당하는 TaskBlock이 없으면 400 에러를 반환합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskBlockDto: UpdateTaskBlockDto,
  ) {
    return await this.taskBlocksService.update(id, updateTaskBlockDto);
  }

  @ApiOperation({
    summary: 'TaskBlock 삭제',
    description:
      'TaskBlock을 id를 가지고 삭제합니다. id에 해당하는 TaskBlock이 없으면 400 에러를 반환합니다.',
  })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.taskBlocksService.remove(id);
  }

  @ApiOperation({
    summary: 'TaskBlock 소프트 삭제',
    description:
      'TaskBlock을 id를 가지고 소프트 삭제합니다.(실제로 db에 사라지지 않고 deletedAt이 update됩니다.) id에 해당하는 TaskBlock이 없으면 400 에러를 반환합니다.',
  })
  @Delete('soft/:id')
  async softRemove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.taskBlocksService.softRemove(id);
  }
}
