import { Injectable } from '@nestjs/common';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger, Repository } from 'typeorm';
import { TaskBlock } from './entities/task-block.entity';

@Injectable()
export class TaskBlocksService {
  constructor(
    @InjectRepository(TaskBlock)
    private readonly taskBlockRepository: Repository<TaskBlock>,
    private readonly logger: Logger,
  ) {}

  async create(taskBlock: TaskBlock) {
    return await this.taskBlockRepository.save(taskBlock);
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
