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

  async addContentToTaskBlock(
    taskBlockId: string,
    content: string,
  ): Promise<TaskBlock> {
    const taskBlock = await this.findByIdOrException(taskBlockId);
    taskBlock.contents.push(content);
    return await this.taskBlockRepository.save(taskBlock);
  }

  async removeContentFromTaskBlock(
    taskBlockId: string,
    content: string,
  ): Promise<TaskBlock> {
    const taskBlock = await this.findByIdOrException(taskBlockId);
    taskBlock.contents = taskBlock.contents.filter((c) => c !== content);
    return await this.taskBlockRepository.save(taskBlock);
  }

  async findAllWithAgentId(agentId: string): Promise<TaskBlock[]> {
    const taskBlocks = await this.taskBlockRepository.find({
      where: {
        agentBlockId: agentId,
      },
      order: { updatedAt: 'DESC' },
    });
    if (taskBlocks.length == 0) {
      throw new HttpException(
        `TaskBlock with agentId:${agentId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return taskBlocks;
  }

  async findByIdOrException(id: string) {
    const foundTaskBlock = await this.taskBlockRepository.findOne({
      where: { id: id },
      relations: ['agentBlock'],
      order: { updatedAt: 'DESC' },
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
    await this.agentBlocksService.addContentToAgentBlock(agentId, taskBlock.id);
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
      order: { updatedAt: 'DESC' },
    });
    if (taskBlocksList.length == 0) {
      throw new HttpException(
        `TaskBlock with query:${JSON.stringify(query)} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return taskBlocksList;
  }

  async update(
    id: string,
    updateTaskBlockDto: UpdateTaskBlockDto,
  ): Promise<TaskBlock> {
    await this.findByIdOrException(id);
    await this.taskBlockRepository.update(id, updateTaskBlockDto);
    return await this.findByIdOrException(id);
  }

  async remove(id: string) {
    const taskBlock = await this.findByIdOrException(id);
    await this.taskBlockRepository.delete(id);
    await this.agentBlocksService.removeContentFromAgentBlock(
      taskBlock.agentBlockId,
      taskBlock.id,
    );
    return taskBlock;
  }

  async softRemove(id: string) {
    await this.findByIdOrException(id);
    return await this.taskBlockRepository.softDelete(id);
  }
}
