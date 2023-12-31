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
  ParseUUIDPipe,
  BadRequestException,
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
@Controller('v1/agent-blocks')
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
    let realPrice: number;
    try {
      const { price } = createAgentBlockDto;
      realPrice = Number(price.split(' ')[0]);
      if (isNaN(realPrice)) {
        throw new Error('price is not a number');
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        `price format is not correct. ${createAgentBlockDto.price}. It has to be price + ' ' + currency. ex) 10000 KR`,
      );
    }
    return await this.agentBlocksService.create(
      createAgentBlockDto.toEntity(user, realPrice),
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
    summary:
      'agent Block 전체 조회 N. 유저가 에이전트를 스크랩 했는지를 반환합니다.',
    description:
      'agent Block 전체를 조회합니다. 스크랩 여부를 함께 반환합니다. 유저는 access-token으로부터 가져옵니다.',
  })
  @Get('/all/@me')
  async findAllForUser(@CurrentUser() user: User) {
    return await this.agentBlocksService.findAllAgentBlocksForUser(user.id);
  }

  @ApiOperation({
    summary: 'agent Block 조회 1',
    description: 'agent Block id를 가지고 agent Block 한개를 조회합니다.',
  })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.agentBlocksService.findOne(id);
  }

  @ApiOperation({
    summary: 'agent Block 조회 1~n',
    description:
      '쿼리로 agent Block 정보를 받아서 그에 해당하는 agent Block 리스트를 반환합니다.',
  })
  @Get()
  async findByQuery(
    @Query() query: AgentBlocksQuery,
    @CurrentUser() user: User,
  ) {
    this.logger.log(`[AgentBlocksController] query: ${JSON.stringify(query)}`);
    return await this.agentBlocksService.findAgentBlocksByDQuery(
      query,
      user.id,
    );
  }

  @ApiOperation({
    summary: 'agent Block 수정',
    description: 'agent Block id를 가지고 agent Block 한개를 수정합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
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
  async softRemove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.log(`soft delete agent block id: ${JSON.stringify(id)}`);
    return await this.agentBlocksService.softDelete(id);
  }
}
