import { Injectable } from '@nestjs/common';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';

@Injectable()
export class UserToolsService {
  create(createUserToolDto: CreateUserToolDto) {
    return 'This action adds a new userTool';
  }

  findAll() {
    return `This action returns all userTools`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTool`;
  }

  update(id: number, updateUserToolDto: UpdateUserToolDto) {
    return `This action updates a #${id} userTool`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTool`;
  }
}
