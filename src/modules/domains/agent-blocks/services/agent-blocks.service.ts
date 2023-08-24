import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAgentBlockDto } from '../dto/create-agent-block.dto';
import { UpdateAgentBlockDto } from '../dto/update-agent-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentBlock } from '../entities/agent-block.entity';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { UsersService } from '../../users/services/users.service';
import { UsersRelatedAgentBlockService } from '../../users/services/usersAgentBlock.service';
import { User } from '../../users/entities/user.entity';
import { AgentBlocksQuery } from '../dto/dquery-agent-block.dto';

@Injectable()
export class AgentBlocksService {
  private readonly logger = new Logger('AgentBlock');
  constructor(
    @InjectRepository(AgentBlock)
    private readonly agentBlockRepository: Repository<AgentBlock>,
    private readonly usersService: UsersRelatedAgentBlockService,
  ) {}

  async create(agentBlock: AgentBlock, user: User) {
    await this.usersService.addAgentBlock(user, agentBlock);
    return await this.agentBlockRepository.save(agentBlock);
  }

  async findAgentBlocksByDQuery(query: AgentBlocksQuery) {
    const agentBlocksList: AgentBlock[] = await this.agentBlockRepository.find({
      where: query,
    });
    if (agentBlocksList.length == 0) {
      throw new HttpException(
        `AgentBlock with query:${JSON.stringify(query)} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.agentBlockRepository.find();
  }

  async findAll() {
    return await this.agentBlockRepository.find();
  }

  async findOneByAgentIdOrException(agentId: string) {
    const foundAgent = await this.agentBlockRepository.findOne({
      where: { id: agentId },
    });
    if (!foundAgent) {
      throw new HttpException(
        `AgentBlock with id:${agentId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundAgent;
  }

  async findOne(id: string) {
    const foundAgent = await this.findOneByAgentIdOrException(id);
    return foundAgent;
  }

  async update(id: string, updateAgentBlockDto: UpdateAgentBlockDto) {
    await this.findOneByAgentIdOrException(id);
    return await this.agentBlockRepository.update(id, updateAgentBlockDto);
  }

  async remove(id: string) {
    await this.findOneByAgentIdOrException(id);
    return await this.agentBlockRepository.delete(id);
  }

  async softDelete(id: string) {
    await this.findOneByAgentIdOrException(id);
    return await this.agentBlockRepository.softDelete(id);
  }
}
