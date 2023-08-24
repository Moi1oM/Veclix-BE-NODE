import { Injectable } from '@nestjs/common';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';

@Injectable()
export class TaskBlocksService {
  create(createTaskBlockDto: CreateTaskBlockDto) {
    return 'This action adds a new taskBlock';
  }

  findAll() {
    return `This action returns all taskBlocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskBlock`;
  }

  update(id: number, updateTaskBlockDto: UpdateTaskBlockDto) {
    return `This action updates a #${id} taskBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskBlock`;
  }
}
