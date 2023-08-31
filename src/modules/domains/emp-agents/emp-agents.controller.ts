import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpAgentsService } from './emp-agents.service';
import { CreateEmpAgentDto } from './dto/create-emp-agent.dto';
import { UpdateEmpAgentDto } from './dto/update-emp-agent.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('emp-agents')
@Controller('emp-agents')
export class EmpAgentsController {
  constructor(private readonly empAgentsService: EmpAgentsService) {}

  @ApiOperation({
    deprecated: true,
  })
  @Post()
  create(@Body() createEmpAgentDto: CreateEmpAgentDto) {
    return this.empAgentsService.create(createEmpAgentDto);
  }
  @ApiOperation({
    deprecated: true,
  })
  @Get()
  findAll() {
    return this.empAgentsService.findAll();
  }
  @ApiOperation({
    deprecated: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empAgentsService.findOne(+id);
  }
  @ApiOperation({
    deprecated: true,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpAgentDto: UpdateEmpAgentDto,
  ) {
    return this.empAgentsService.update(+id, updateEmpAgentDto);
  }
  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empAgentsService.remove(+id);
  }
}
