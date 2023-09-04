import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmpAgentsService } from './emp-agents.service';
import { CreateEmpAgentDto } from './dto/create-emp-agent.dto';
import { UpdateEmpAgentDto } from './dto/update-emp-agent.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmpAgentQuery } from './dto/dquery-emp-agent.dto';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';

@ApiTags('emp-agents')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/emp-agents')
export class EmpAgentsController {
  constructor(private readonly empAgentsService: EmpAgentsService) {}

  @ApiOperation({
    summary: 'creating employed agent',
    description: 'creating employed agent.',
  })
  @Post()
  async create(@Body() createEmpAgentDto: CreateEmpAgentDto) {
    return await this.empAgentsService.create(createEmpAgentDto);
  }

  @ApiOperation({
    summary: 'get all employed agents',
    description: 'get all employed agents.',
  })
  @Get('all')
  async findAll() {
    return await this.empAgentsService.findAll();
  }

  @ApiOperation({
    summary: 'get employed agent by id',
    description: 'get employed agent by id. 400 error if not found.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.empAgentsService.findOneByIdOrException(id);
  }

  @ApiOperation({
    summary: 'get employed agent by query',
    description: 'get employed agent by query.',
  })
  @Get()
  async getByQuery(@Query() query: EmpAgentQuery) {
    return await this.empAgentsService.getByQuery(query);
  }

  @ApiOperation({
    summary: 'update employed agent by id',
    description: 'update employed agent by id. 400 error if not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmpAgentDto: UpdateEmpAgentDto,
  ) {
    return await this.empAgentsService.update(id, updateEmpAgentDto);
  }

  @ApiOperation({
    summary: 'delete employed agent by id',
    description: 'delete employed agent by id. 400 error if not found.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.empAgentsService.remove(id);
  }
}
