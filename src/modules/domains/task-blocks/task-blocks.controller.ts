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
} from '@nestjs/common';
import { TaskBlocksService } from './task-blocks.service';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('task-blocks')
@UseGuards(BasicAuthGuard)
@Controller('task-blocks')
export class TaskBlocksController {
  constructor(
    private readonly taskBlocksService: TaskBlocksService,
    private readonly logger: Logger,
  ) {}

  @ApiOperation({
    summary: 'TaskBlock 생성',
    description: 'TaskBlock을 생성합니다.',
  })
  @Post()
  create(
    @Body() createTaskBlockDto: CreateTaskBlockDto,
    @CurrentUser() user: User,
  ) {
    this.logger.log(
      `createTaskBlockDto: ${JSON.stringify(
        createTaskBlockDto,
      )}, user: ${JSON.stringify(user)}`,
    );
    return this.taskBlocksService.create(createTaskBlockDto.toEntity(user));
  }

  @ApiOperation({ deprecated: true })
  @Get()
  findAll() {
    return this.taskBlocksService.findAll();
  }

  @ApiOperation({ deprecated: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskBlocksService.findOne(+id);
  }

  @ApiOperation({ deprecated: true })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskBlockDto: UpdateTaskBlockDto,
  ) {
    return this.taskBlocksService.update(+id, updateTaskBlockDto);
  }

  @ApiOperation({ deprecated: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskBlocksService.remove(+id);
  }
}
