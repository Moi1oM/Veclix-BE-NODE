import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskBlocksService } from './task-blocks.service';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';

@Controller('task-blocks')
export class TaskBlocksController {
  constructor(private readonly taskBlocksService: TaskBlocksService) {}

  @Post()
  create(@Body() createTaskBlockDto: CreateTaskBlockDto) {
    return this.taskBlocksService.create(createTaskBlockDto);
  }

  @Get()
  findAll() {
    return this.taskBlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskBlocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskBlockDto: UpdateTaskBlockDto) {
    return this.taskBlocksService.update(+id, updateTaskBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskBlocksService.remove(+id);
  }
}
