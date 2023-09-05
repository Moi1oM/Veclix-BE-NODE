import { TaskBlocksService } from './../../task-blocks/task-blocks.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateToolBlockDto } from '../dto/create-tool-block.dto';
import { UpdateToolBlockDto } from '../dto/update-tool-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolBlock } from '../entities/tool-block.entity';
import { Repository } from 'typeorm';
import { TaskBlock } from '../../task-blocks/entities/task-block.entity';

@Injectable()
export class ToolBlocksService {
  constructor(
    @InjectRepository(ToolBlock)
    private readonly toolBlockRepository: Repository<ToolBlock>,
    private readonly taskBlocksService: TaskBlocksService,
  ) {}

  async findByIdOrException(id: string) {
    const foundToolBlock = await this.toolBlockRepository.findOne({
      where: { id: id },
      relations: ['taskBlock'],
      order: { updatedAt: 'DESC' },
    });
    if (!foundToolBlock) {
      throw new HttpException(
        `ToolBlock with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundToolBlock;
  }

  async findToolBlocksByDQuery(query: any) {
    const toolBlocksList: ToolBlock[] = await this.toolBlockRepository.find({
      where: query,
      relations: ['taskBlock'],
      order: { updatedAt: 'DESC' },
    });
    if (toolBlocksList.length == 0) {
      throw new HttpException(
        `ToolBlock with query:${JSON.stringify(query)} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return toolBlocksList;
  }

  async create(toolBlock: ToolBlock, taskId: string) {
    const taskBlock: TaskBlock =
      await this.taskBlocksService.findByIdOrException(taskId);
    toolBlock.taskBlock = Promise.resolve(taskBlock);
    const createdToolBlock = await this.toolBlockRepository.save(toolBlock);
    await this.taskBlocksService.addContentToTaskBlock(
      taskId,
      createdToolBlock.id,
    );
    return createdToolBlock;
  }

  async findAll() {
    return await this.toolBlockRepository.find({
      relations: ['taskBlock'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const toolBlock: ToolBlock = await this.findByIdOrException(id);
    return toolBlock;
  }

  async update(
    id: string,
    updateToolBlockDto: UpdateToolBlockDto,
  ): Promise<ToolBlock> {
    const toolBlock = await this.findByIdOrException(id);
    await this.toolBlockRepository.update(id, updateToolBlockDto);
    return await this.findByIdOrException(id);
  }

  async remove(id: string): Promise<ToolBlock> {
    const toolBlock = await this.findByIdOrException(id);
    await this.toolBlockRepository.delete(id);
    await this.taskBlocksService.removeContentFromTaskBlock(
      (
        await toolBlock.taskBlock
      ).id,
      id,
    );
    return toolBlock;
  }

  async softDelete(id: string) {
    await this.findByIdOrException(id);
    return await this.toolBlockRepository.softDelete(id);
  }
}
