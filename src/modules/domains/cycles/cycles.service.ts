import { Injectable } from '@nestjs/common';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@Injectable()
export class CyclesService {
  create(createCycleDto: CreateCycleDto) {
    return 'This action adds a new cycle';
  }

  findAll() {
    return `This action returns all cycles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cycle`;
  }

  update(id: number, updateCycleDto: UpdateCycleDto) {
    return `This action updates a #${id} cycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} cycle`;
  }
}
