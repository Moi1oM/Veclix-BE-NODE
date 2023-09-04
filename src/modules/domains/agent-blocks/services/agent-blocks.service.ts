import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { CreateAgentBlockDto } from '../dto/create-agent-block.dto';
import { UpdateAgentBlockDto } from '../dto/update-agent-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentBlock } from '../entities/agent-block.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { UsersRelatedAgentBlockService } from '../../users/services/usersAgentBlock.service';
import { User } from '../../users/entities/user.entity';
import { AgentBlocksQuery } from '../dto/dquery-agent-block.dto';
import { UserScrapsService } from '../../user-scraps/user-scraps.service';
import { ReviewsService } from '../../reviews/reviews.service';

@Injectable()
export class AgentBlocksService {
  private readonly logger = new Logger('AgentBlock');
  constructor(
    @InjectRepository(AgentBlock)
    private readonly agentBlockRepository: Repository<AgentBlock>,
    private readonly usersService: UsersRelatedAgentBlockService,
    private readonly userScrapService: UserScrapsService,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reveiwsService: ReviewsService,
  ) {}

  async addContentToAgentBlock(
    agentBlockId: string,
    content: string,
  ): Promise<AgentBlock> {
    const agentBlock = await this.findOneByAgentIdOrException(agentBlockId);
    agentBlock.contents.push(content);
    return await this.agentBlockRepository.save(agentBlock);
  }

  async removeContentFromAgentBlock(
    agentBlockId: string,
    content: string,
  ): Promise<AgentBlock> {
    const agentBlock = await this.findOneByAgentIdOrException(agentBlockId);
    agentBlock.contents = agentBlock.contents.filter((c) => c !== content);
    return await this.agentBlockRepository.save(agentBlock);
  }

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
        const starAvg = await this.reveiwsService.findAgentsStarAvg(
          agentBlock.id,
        );
        return {
          ...agentBlock,
          hasScrapped,
          starAvg,
        };
      }),
    );

    return agentBlocksWithScrapStatus;
  }

  async findAgentBlocksByDQuery(query: AgentBlocksQuery, user_id: number) {
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
    agentBlocksList.map(async (agentBlock) => {
      const hasScrapped = await this.userScrapService.hasUserScrappedAgent(
        user_id,
        agentBlock.id,
      );
      const starAvg = await this.reveiwsService.findAgentsStarAvg(
        agentBlock.id,
      );
      return {
        ...agentBlock,
        hasScrapped,
        starAvg,
      };
    });
    return agentBlocksList;
  }

  async findAll() {
    return await this.agentBlockRepository.find({
      where: { inStore: true },
      relations: ['crafter'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findOneByAgentIdOrException(agentId: string) {
    const foundAgent = await this.agentBlockRepository.findOne({
      where: { id: agentId },
      relations: ['crafter'],
      order: { updatedAt: 'DESC' },
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

  async update(
    id: string,
    updateAgentBlockDto: UpdateAgentBlockDto,
  ): Promise<AgentBlock> {
    await this.findOneByAgentIdOrException(id);
    await this.agentBlockRepository.update(id, updateAgentBlockDto);
    return await this.findOneByAgentIdOrException(id);
  }

  async remove(id: string): Promise<AgentBlock> {
    const agentBlock = await this.findOneByAgentIdOrException(id);
    await this.agentBlockRepository.delete(id);
    return agentBlock;
  }

  async softDelete(id: string) {
    await this.findOneByAgentIdOrException(id);
    return await this.agentBlockRepository.softDelete(id);
  }
}
