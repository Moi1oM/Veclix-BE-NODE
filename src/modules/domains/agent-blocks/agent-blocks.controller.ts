import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Query,
} from '@nestjs/common';
import { AgentBlocksService } from './services/agent-blocks.service';
import { CreateAgentBlockDto } from './dto/create-agent-block.dto';
import { UpdateAgentBlockDto } from './dto/update-agent-block.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { AgentBlocksQuery } from './dto/dquery-agent-block.dto';
import { TaskBlocksController } from '../task-blocks/task-blocks.controller';

@ApiTags('agent-blocks')
@ApiBearerAuth('access-token을 통한 인증이 필요합니다.')
@UseGuards(BasicAuthGuard)
@Controller('agent-blocks')
export class AgentBlocksController {
  private readonly logger = new Logger('AgentBlock');

  constructor(private readonly agentBlocksService: AgentBlocksService) {}

  @ApiOperation({ summary: 'agent Block' })
  @Post()
  async create(
    @Body() createAgentBlockDto: CreateAgentBlockDto,
    @CurrentUser() user: User,
  ) {
    this.logger.log(
      `createAgentBlockDto: ${JSON.stringify(createAgentBlockDto)}`,
      `user: ${JSON.stringify(user)}`,
    );
    return await this.agentBlocksService.create(
      createAgentBlockDto.toEntity(user),
      user,
    );
  }

  @ApiOperation({
    summary: 'agent Block 전체 조회 N',
    description: 'agent Block 전체를 조회합니다.',
  })
  @Get('/all')
  async findAll() {
    return await this.agentBlocksService.findAll();
  }

  @ApiOperation({
    summary: 'agent Block 조회 1',
    description: 'agent Block id를 가지고 agent Block 한개를 조회합니다.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.agentBlocksService.findOne(id);
  }

  @ApiOperation({
    summary: 'agent Block 조회 1~n',
    description:
      '쿼리로 agent Block 정보를 받아서 그에 해당하는 agent Block 리스트를 반환합니다.',
  })
  @Get()
  async findByQuery(@Query() query: AgentBlocksQuery) {
    this.logger.log(`[AgentBlocksController] query: ${JSON.stringify(query)}`);
    return await this.agentBlocksService.findAgentBlocksByDQuery(query);
  }

  @ApiOperation({
    summary: 'agent Block 수정',
    description: 'agent Block id를 가지고 agent Block 한개를 수정합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAgentBlockDto: UpdateAgentBlockDto,
  ) {
    this.logger.log(
      `id: ${JSON.stringify(id)}, updateAgentBlockDto: ${JSON.stringify(
        updateAgentBlockDto,
      )}`,
    );
    return await this.agentBlocksService.update(id, updateAgentBlockDto);
  }

  @ApiOperation({
    summary: 'agent Block 삭제',
    description: 'agent Block id를 가지고 agent Block 한개를 삭제합니다.',
  })
  @ApiOperation({ deprecated: true })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`delete agent block id: ${JSON.stringify(id)}`);
    return await this.agentBlocksService.remove(id);
  }

  @ApiOperation({
    summary: 'agent Block soft 삭제',
    description:
      'agent Block id를 가지고 agent Block 한개를 soft 삭제합니다. 실제로 삭제되지 않습니다. deleteAt이 업데이트 됩니다.',
  })
  @Delete('soft/:id')
  async softRemove(@Param('id') id: string) {
    this.logger.log(`soft delete agent block id: ${JSON.stringify(id)}`);
    return await this.agentBlocksService.softDelete(id);
  }
}
