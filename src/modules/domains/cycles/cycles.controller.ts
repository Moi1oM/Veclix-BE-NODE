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
  ParseUUIDPipe,
} from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CycleQuery } from './dto/cycle-query.dto';

@ApiTags('cycles')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}

  @ApiOperation({
    deprecated: true,
    summary: 'creating cycle',
    description: 'creating cycle. with auth & post body.',
  })
  @Post()
  async create(@Body() createCycleDto: CreateCycleDto) {
    if (createCycleDto.type === 'parent') {
      createCycleDto.current_task_id =
        await this.cyclesService.findCurrentTaskId(
          createCycleDto.agent_block_id,
        );
    }
    return await this.cyclesService.create(createCycleDto);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get cycle and messages related with agentId',
    description: 'get cycle and messages. with auth.',
  })
  @Get('cycles/:id/messages')
  async getCycleAndMessages(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cyclesService.getCycleAndMessages(id);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get all cycles and messages related with cycleId',
    description: 'get all cycles and messages. with auth.',
  })
  @Get('cycles/:id/all-messages')
  async getAllCycleAndMessages(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cyclesService.getAllCycleAndMessages(id);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get all cycles',
    description: 'get all cycles. with auth.',
  })
  @Get('all')
  async findAll() {
    return await this.cyclesService.findAll();
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get all scheduled cycles',
    description: 'get all scheduled cycles. with auth.',
  })
  @Get('scheduled')
  async findScheduledCycles() {
    return await this.cyclesService.findScheduledCycles();
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get cycle by id',
    description: 'get cycle by id. 400 error if not found.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cyclesService.findCycleByIdOrException(id);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get cycle by query',
    description: 'get cycle by query. data will provide with query.',
  })
  @Get()
  async getByQuery(@Query() query: CycleQuery) {
    return this.cyclesService.getByQuery(query);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'update cycle by id',
    description: 'update cycle by id. 400 error if not found.',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCycleDto: UpdateCycleDto,
  ) {
    return await this.cyclesService.update(id, updateCycleDto);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cyclesService.remove(id);
  }
}
