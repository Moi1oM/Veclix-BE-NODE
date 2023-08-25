import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskBlock } from './entities/task-block.entity';
import { AgentBlocksService } from '../agent-blocks/services/agent-blocks.service';

@Injectable()
export class TaskBlocksService {
  private readonly logger = new Logger('TaskBlock');

  constructor(
    @InjectRepository(TaskBlock)
    private readonly taskBlockRepository: Repository<TaskBlock>,
    private readonly agentBlocksService: AgentBlocksService,
  ) {}

  async findByIdOrException(id: string) {
    const foundTaskBlock = await this.taskBlockRepository.findOne({
      where: { id: id },
      relations: ['agentBlock'],
    });
    console.log(foundTaskBlock.crafter);
    if (!foundTaskBlock) {
      throw new HttpException(
        `TaskBlock with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundTaskBlock;
  }

  async create(taskBlock: TaskBlock, agentId: string) {
    const agentBlock =
      await this.agentBlocksService.findOneByAgentIdOrException(agentId);
    taskBlock.agentBlock = Promise.resolve(agentBlock);
    return await this.taskBlockRepository.save(taskBlock);
  }

  async findAll() {
    return await this.taskBlockRepository.find({
      relations: ['agentBlock'],
    });
  }

  async findOne(id: string) {
    const taskBlock: TaskBlock = await this.findByIdOrException(id);
    console.log(taskBlock);
    return taskBlock;
  }

  async findTaskBlocksByDQuery(query: any) {
    const taskBlocksList: TaskBlock[] = await this.taskBlockRepository.find({
      where: query,
      relations: ['crafter'],
    });
    if (taskBlocksList.length == 0) {
      throw new HttpException(
        `TaskBlock with query:${JSON.stringify(query)} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return taskBlocksList;
  }

  async update(id: string, updateTaskBlockDto: UpdateTaskBlockDto) {
    await this.findByIdOrException(id);
    return await this.taskBlockRepository.update(id, updateTaskBlockDto);
  }

  async remove(id: string) {
    await this.findByIdOrException(id);
    return await this.taskBlockRepository.delete(id);
  }

  async softRemove(id: string) {
    await this.findByIdOrException(id);
    return await this.taskBlockRepository.softDelete(id);
  }
}
