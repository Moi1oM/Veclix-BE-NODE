import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cycle } from './entities/cycle.entity';
import { Repository } from 'typeorm';
import { AgentBlocksService } from '../agent-blocks/services/agent-blocks.service';
import { TaskBlocksService } from '../task-blocks/task-blocks.service';
import { CycleStatus } from './entities/cycle.enum';
import { EmpAgentsService } from '../emp-agents/emp-agents.service';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../messages/entities/message.entity';

@Injectable()
export class CyclesService {
  constructor(
    @InjectRepository(Cycle)
    private readonly cycleRepository: Repository<Cycle>,
    private readonly agentBlocksService: AgentBlocksService,
    private readonly taskBlocksService: TaskBlocksService,
    private readonly empAgentsService: EmpAgentsService,
    private readonly messagesService: MessagesService,
  ) {}

  async findMyCycle(userId: number) {
    // find agentBlock with userId
    const empAgents = await this.empAgentsService.findByUserIdOrException(
      userId,
    );
    const cycles: Cycle[] = [];
    for (const empAgent of empAgents) {
      const newCycles = empAgent.cycles;
      cycles.push(...newCycles);
    }
    return cycles;
  }

  async findCurrentTaskId(agentBlockId: string): Promise<string> {
    const empAgentBlock = await this.empAgentsService.findOneByIdOrException(
      agentBlockId,
    );
    const agentBlock =
      await this.agentBlocksService.findOneByAgentIdOrException(
        empAgentBlock.agentClassId,
      );
    const taskArray = agentBlock.contents;
    return taskArray[0];
  }

  async getCycleAndMessages(agentId: string): Promise<Message[]> {
    const cycles = await this.cycleRepository.find({
      where: { agent_block_id: agentId },
      order: { updatedAt: 'DESC' },
    });
    // find messages with cycleId. it will be many cycles
    const cycleIds = cycles.map((cycle) => cycle.id);
    const messages: Message[] = [];
    for (const cycle of cycleIds) {
      const newMessages = await this.messagesService.findWithCycleId(cycle);
      messages.push(...newMessages);
    }
    return messages;
  }

  async getAllCycleAndMessages(cycleId: string): Promise<Message[]> {
    const cycle = await this.findCycleByIdOrException(cycleId);
    if (!cycle) {
      throw new HttpException(
        `Cycle with id ${cycleId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let parentCycleId = (await cycle.parentCycle)?.id;
    const messages: Message[] = await this.messagesService.findWithCycleId(
      cycleId,
    );
    while (parentCycleId) {
      const parentMessages: Message[] =
        await this.messagesService.findWithCycleId(parentCycleId);
      messages.push(...parentMessages);
      const parentCycle = await this.findCycleByIdOrException(parentCycleId);
      parentCycleId = (await parentCycle.parentCycle)?.id;
    }
    // TODO : SUBTASK MESSAGES
    return messages;
  }

  async findScheduledCycles(): Promise<Cycle[]> {
    // find Cycle where cycleStatus is queued or waiting
    return await this.cycleRepository.find({
      where: [{ status: CycleStatus.waiting }, { status: CycleStatus.queued }],
      relations: ['parentCycle', 'agentBlock', 'taskBlock'],
      order: { updatedAt: 'DESC' },
    });
  }

  async getByQuery(query: any): Promise<Cycle[]> {
    return await this.cycleRepository.find({
      where: query,
      relations: ['parentCycle', 'agentBlock', 'taskBlock'],
      order: { updatedAt: 'DESC' },
    });
  }

  async create(createCycleDto: CreateCycleDto): Promise<Cycle> {
    const data = {
      ...createCycleDto,
    };
    if (createCycleDto.parent_cycle_id) {
      const parentCycle = await this.findCycleByIdOrException(
        createCycleDto.parent_cycle_id,
      );
      // add content to parentCycle
      if (parentCycle) {
        data['parentCycle'] = parentCycle;
      }
    }
    if (createCycleDto.agent_block_id) {
      const agentBlock =
        await this.agentBlocksService.findOneByAgentIdOrException(
          createCycleDto.agent_block_id,
        );
      if (agentBlock) {
        data['agentBlock'] = agentBlock;
      }
    }
    const cycle = await this.cycleRepository.save(data);
    // add content to agentBlock
    if (createCycleDto.agent_block_id) {
      await this.agentBlocksService.addContentToAgentBlock(
        createCycleDto.agent_block_id,
        cycle.id,
      );
    }
    return cycle;
  }

  async findAll(): Promise<Cycle[]> {
    return await this.cycleRepository.find();
  }

  async findCycleByIdOrException(id: string): Promise<Cycle> {
    const cycle = await this.cycleRepository.findOne({
      where: { id: id },
    });
    if (!cycle) {
      throw new HttpException(
        `Cycle with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return cycle;
  }

  async update(id: string, updateCycleDto: UpdateCycleDto): Promise<Cycle> {
    await this.findCycleByIdOrException(id);
    await this.cycleRepository.update(id, updateCycleDto);
    return await this.findCycleByIdOrException(id);
  }

  async remove(id: string): Promise<Cycle> {
    const cycle = await this.findCycleByIdOrException(id);
    await this.cycleRepository.delete(id);
    const parentCycle = await cycle.parentCycle;
    if (parentCycle) {
      await this.removeSubIdInContents(parentCycle.id, id);
    }
    return cycle;
  }

  async addSubIdInContents(id: string, subId: string): Promise<Cycle> {
    const cycle = await this.findCycleByIdOrException(id);
    const contents = cycle.contents;
    contents.push(subId);
    return await this.cycleRepository.save(cycle);
  }

  async removeSubIdInContents(id: string, subId: string): Promise<Cycle> {
    const cycle = await this.findCycleByIdOrException(id);
    const contents = cycle.contents;
    cycle.contents = contents.filter((c) => c !== subId);
    return await this.cycleRepository.save(cycle);
  }
}
