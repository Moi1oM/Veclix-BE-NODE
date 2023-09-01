import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
  ) {}

  async findOneByIdOrException(id: string): Promise<Tool> {
    const tool = await this.toolRepository.findOne({
      where: { id: id },
    });
    if (!tool) {
      throw new HttpException(
        `Tool with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return tool;
  }

  async create(createToolDto: CreateToolDto): Promise<Tool> {
    return await this.toolRepository.save(createToolDto);
  }

  async findAll(): Promise<Tool[]> {
    return await this.toolRepository.find();
  }

  async update(id: string, updateToolDto: UpdateToolDto): Promise<Tool> {
    await this.findOneByIdOrException(id);
    await this.toolRepository.update(id, updateToolDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: string): Promise<Tool> {
    const tool = await this.findOneByIdOrException(id);
    await this.toolRepository.delete(id);
    return tool;
  }
}
