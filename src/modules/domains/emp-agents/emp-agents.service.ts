import { Injectable } from '@nestjs/common';
import { CreateEmpAgentDto } from './dto/create-emp-agent.dto';
import { UpdateEmpAgentDto } from './dto/update-emp-agent.dto';

@Injectable()
export class EmpAgentsService {
  create(createEmpAgentDto: CreateEmpAgentDto) {
    return 'This action adds a new empAgent';
  }

  findAll() {
    return `This action returns all empAgents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empAgent`;
  }

  update(id: number, updateEmpAgentDto: UpdateEmpAgentDto) {
    return `This action updates a #${id} empAgent`;
  }

  remove(id: number) {
    return `This action removes a #${id} empAgent`;
  }
}
