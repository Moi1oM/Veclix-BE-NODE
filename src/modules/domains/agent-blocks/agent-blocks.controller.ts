import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AgentBlocksService } from './services/agent-blocks.service';
import { CreateAgentBlockDto } from './dto/create-agent-block.dto';
import { UpdateAgentBlockDto } from './dto/update-agent-block.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';

@ApiTags('agent-blocks')
@UseGuards(BasicAuthGuard)
@Controller('agent-blocks')
export class AgentBlocksController {
  constructor(private readonly agentBlocksService: AgentBlocksService) {}

  @ApiOperation({ deprecated: true })
  @Post()
  create(@Body() createAgentBlockDto: CreateAgentBlockDto) {
    return this.agentBlocksService.create(createAgentBlockDto);
  }

  @ApiOperation({ deprecated: true })
  @Get()
  findAll() {
    return this.agentBlocksService.findAll();
  }

  @ApiOperation({ deprecated: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentBlocksService.findOne(+id);
  }

  @ApiOperation({ deprecated: true })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgentBlockDto: UpdateAgentBlockDto,
  ) {
    return this.agentBlocksService.update(+id, updateAgentBlockDto);
  }

  @ApiOperation({ deprecated: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentBlocksService.remove(+id);
  }
}
