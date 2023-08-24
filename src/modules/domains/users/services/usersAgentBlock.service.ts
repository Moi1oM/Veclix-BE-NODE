import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';

@Injectable()
export class UsersRelatedAgentBlockService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addAgentBlock(user: User, agentBlock: AgentBlock) {
    user.agentBlocks.push(agentBlock);
    return await this.userRepository.save(user);
  }
}
