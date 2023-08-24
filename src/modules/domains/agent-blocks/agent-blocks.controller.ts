import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgentBlocksService } from './services/agent-blocks.service';
import { CreateAgentBlockDto } from './dto/create-agent-block.dto';
import { UpdateAgentBlockDto } from './dto/update-agent-block.dto';

@Controller('agent-blocks')
export class AgentBlocksController {
  constructor(private readonly agentBlocksService: AgentBlocksService) {}

  @Post()
  create(@Body() createAgentBlockDto: CreateAgentBlockDto) {
    return this.agentBlocksService.create(createAgentBlockDto);
  }

  @Get()
  findAll() {
    return this.agentBlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentBlocksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgentBlockDto: UpdateAgentBlockDto,
  ) {
    return this.agentBlocksService.update(+id, updateAgentBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentBlocksService.remove(+id);
  }
}
