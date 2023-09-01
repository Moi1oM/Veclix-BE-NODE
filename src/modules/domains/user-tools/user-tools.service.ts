import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTool } from './entities/user-tool.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserToolsService {
  constructor(
    @InjectRepository(UserTool)
    private readonly userToolRepository: Repository<UserTool>,
  ) {}

  async create(createUserToolDto: CreateUserToolDto): Promise<UserTool> {
    return await this.userToolRepository.save(createUserToolDto);
  }

  async findAll(): Promise<UserTool[]> {
    return await this.userToolRepository.find();
  }

  async findOneByIdOrException(id: number): Promise<UserTool> {
    const userTool = await this.userToolRepository.findOne({
      where: { id: id },
    });
    if (!userTool) {
      throw new HttpException(
        `UserTool with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userTool;
  }

  async update(
    id: number,
    updateUserToolDto: UpdateUserToolDto,
  ): Promise<UserTool> {
    await this.findOneByIdOrException(id);
    await this.userToolRepository.update(id, updateUserToolDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: number): Promise<UserTool> {
    const userTool = await this.findOneByIdOrException(id);
    await this.userToolRepository.delete(id);
    return userTool;
  }
}
