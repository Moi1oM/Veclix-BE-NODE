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

  async create(createToolDto: CreateToolDto) {
    return 'This action adds a new tool';
  }

  async findAll() {
    return `This action returns all tools`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} tool`;
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  async remove(id: string) {
    return `This action removes a #${id} tool`;
  }
}
