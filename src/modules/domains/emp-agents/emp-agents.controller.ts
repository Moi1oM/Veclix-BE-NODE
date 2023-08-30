import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpAgentsService } from './emp-agents.service';
import { CreateEmpAgentDto } from './dto/create-emp-agent.dto';
import { UpdateEmpAgentDto } from './dto/update-emp-agent.dto';

@Controller('emp-agents')
export class EmpAgentsController {
  constructor(private readonly empAgentsService: EmpAgentsService) {}

  @Post()
  create(@Body() createEmpAgentDto: CreateEmpAgentDto) {
    return this.empAgentsService.create(createEmpAgentDto);
  }

  @Get()
  findAll() {
    return this.empAgentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empAgentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpAgentDto: UpdateEmpAgentDto) {
    return this.empAgentsService.update(+id, updateEmpAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empAgentsService.remove(+id);
  }
}
