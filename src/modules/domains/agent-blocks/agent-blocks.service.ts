import { Injectable } from '@nestjs/common';
import { CreateAgentBlockDto } from './dto/create-agent-block.dto';
import { UpdateAgentBlockDto } from './dto/update-agent-block.dto';

@Injectable()
export class AgentBlocksService {
  create(createAgentBlockDto: CreateAgentBlockDto) {
    return 'This action adds a new agentBlock';
  }

  findAll() {
    return `This action returns all agentBlocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agentBlock`;
  }

  update(id: number, updateAgentBlockDto: UpdateAgentBlockDto) {
    return `This action updates a #${id} agentBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} agentBlock`;
  }
}
