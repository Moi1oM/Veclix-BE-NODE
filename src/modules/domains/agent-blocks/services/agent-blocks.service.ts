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
import { UserScrapsService } from '../../user-scraps/user-scraps.service';

@Injectable()
export class AgentBlocksService {
  private readonly logger = new Logger('AgentBlock');
  constructor(
    @InjectRepository(AgentBlock)
    private readonly agentBlockRepository: Repository<AgentBlock>,
    private readonly usersService: UsersRelatedAgentBlockService,
    private readonly userScrapService: UserScrapsService,
  ) {}

  async create(agentBlock: AgentBlock, user: User) {
    // await this.usersService.addAgentBlock(user, agentBlock);
    return await this.agentBlockRepository.save(agentBlock);
  }

  async findAllAgentBlocksForUser(user_id: number): Promise<any[]> {
    const allAgentBlocks: AgentBlock[] = await this.findAll();

    const agentBlocksWithScrapStatus = await Promise.all(
      allAgentBlocks.map(async (agentBlock) => {
        const hasScrapped = await this.userScrapService.hasUserScrappedAgent(
          user_id,
          agentBlock.id,
        );
        return {
          ...agentBlock,
          hasScrapped,
        };
      }),
    );

    return agentBlocksWithScrapStatus;
  }

  async findAgentBlocksByDQuery(query: AgentBlocksQuery) {
    const agentBlocksList: AgentBlock[] = await this.agentBlockRepository.find({
      where: query,
      relations: ['crafter'],
    });
    if (agentBlocksList.length == 0) {
      throw new HttpException(
        `AgentBlock with query:${JSON.stringify(query)} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return agentBlocksList;
  }

  async findAll() {
    return await this.agentBlockRepository.find({ relations: ['crafter'] });
  }

  async findOneByAgentIdOrException(agentId: string) {
    const foundAgent = await this.agentBlockRepository.findOne({
      where: { id: agentId },
      relations: ['crafter'],
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
