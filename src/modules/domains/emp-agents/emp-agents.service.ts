import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateEmpAgentDto } from './dto/create-emp-agent.dto';
import { UpdateEmpAgentDto } from './dto/update-emp-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpAgent } from './entities/emp-agent.entity';
import { Repository } from 'typeorm';
import { AgentBlocksService } from '../agent-blocks/services/agent-blocks.service';
import { ToolBlocksService } from '../tool-blocks/services/tool-blocks.service';
import { TaskBlocksService } from '../task-blocks/task-blocks.service';
import { ToolsService } from '../tools/tools.service';

@Injectable()
export class EmpAgentsService {
  private readonly logger = new Logger(EmpAgentsService.name);
  constructor(
    @InjectRepository(EmpAgent)
    private readonly empAgentRepository: Repository<EmpAgent>,
    private readonly taskBlocksService: TaskBlocksService,
    private readonly toolBlocksService: ToolBlocksService,
    private readonly toolsService: ToolsService,
  ) {}

  async getToolsListWithAgentId(agentId: string): Promise<string[]> {
    const toolNameSet = new Set<string>();
    try {
      const tasks = await this.taskBlocksService.findAllWithAgentId(agentId);
      for (const task of tasks) {
        const toolUuids: string[] = task.contents || [];

        for (const toolUuid of toolUuids) {
          const toolData = await this.toolBlocksService.findByIdOrException(
            toolUuid,
          );
          const toolID = toolData.properties?.tool_class_id;
          if (toolID) {
            const toolNameData = await this.toolsService.findOneByIdOrException(
              toolID,
            );
            toolNameSet.add(toolNameData.tool_set);
          }
        }
      }
    } catch (e) {
      this.logger.error(
        `An error occurred while getting tools list: ${e.toString()}`,
      );
    }
    return Array.from(toolNameSet);
  }

  async create(createEmpAgentDto: CreateEmpAgentDto): Promise<EmpAgent> {
    const toolNameArray = await this.getToolsListWithAgentId(
      createEmpAgentDto.agent_class_id,
    );
    createEmpAgentDto.tools = toolNameArray;
    return await this.empAgentRepository.save(createEmpAgentDto);
  }

  async findOneByIdOrException(id: string): Promise<EmpAgent> {
    const empAgent = await this.empAgentRepository.findOne({
      where: { id: id },
    });
    if (!empAgent) {
      throw new HttpException(
        `empAgent with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return empAgent;
  }

  async findAll(): Promise<EmpAgent[]> {
    return await this.empAgentRepository.find();
  }

  async getByQuery(query: any): Promise<EmpAgent[]> {
    return await this.empAgentRepository.find({ where: query });
  }

  async update(
    id: string,
    updateEmpAgentDto: UpdateEmpAgentDto,
  ): Promise<EmpAgent> {
    await this.findOneByIdOrException(id);
    await this.empAgentRepository.update(id, updateEmpAgentDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: string): Promise<EmpAgent> {
    const empAgent = await this.findOneByIdOrException(id);
    await this.empAgentRepository.remove(empAgent);
    return empAgent;
  }
}
