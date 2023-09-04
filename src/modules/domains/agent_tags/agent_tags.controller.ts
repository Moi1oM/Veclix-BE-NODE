import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AgentTagsService } from './services/agent_tags.service';
import { CreateOrDeleteAgentTagDto } from './dto/create-delete-agent_tag.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { AgentTagDQuery } from './dto/dquery-agent-tag.dto';

@ApiTags('agent-tags')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/agent-tags')
export class AgentTagsController {
  constructor(private readonly agentTagsService: AgentTagsService) {}

  @ApiOperation({
    summary: '에이전트 태그 생성',
    description: '에이전트 태그를 생성합니다.',
  })
  @Post()
  create(@Body() data: CreateOrDeleteAgentTagDto) {
    return this.agentTagsService.existsOrCreate(data.agent_uuid, data.tag_name);
  }

  @ApiOperation({
    summary: '에이전트 전체 태그 조회',
    description: '에이전트 전체 태그를 조회합니다.',
  })
  @Get('all')
  findAll() {
    return this.agentTagsService.findAll();
  }

  @ApiOperation({
    summary: '에이전트 태그 조회',
    description:
      '에이전트 태그를 조회합니다. agent_uuid와 태그 이름이 필요합니다. 해당하는 태그가 없으면 400 에러를 반환합니다.',
  })
  @Get()
  findOne(@Query() query: AgentTagDQuery) {
    return this.agentTagsService.findAgentTagsByQuery(query);
  }

  @ApiOperation({
    summary: '에이전트 태그 삭제',
    description:
      '에이전트 태그를 삭제합니다. agent_uuid와 태그 이름이 필요합니다.',
  })
  @Delete()
  remove(@Body() data: CreateOrDeleteAgentTagDto) {
    return this.agentTagsService.remove(data.agent_uuid, data.tag_name);
  }
}
