import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('runs')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @ApiOperation({
    summary: 'creating run',
    description: 'creating run. with auth & post body.',
  })
  @Post()
  async create(@Body() createRunDto: CreateRunDto) {
    return await this.runsService.create(createRunDto);
  }

  @ApiOperation({
    summary: 'get run by agentId',
    description: 'get run by agentId. with auth.',
  })
  @Get('@me')
  async findMyRun(@CurrentUser() user: User) {
    return await this.runsService.findMyRun(user.id);
  }

  @ApiOperation({
    summary: 'get all runs',
    description: 'get all runs. with auth.',
  })
  @Get('all')
  async findAll() {
    return await this.runsService.findAll();
  }

  @ApiOperation({
    summary: 'get run by id',
    description: 'get run by id. with auth.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.runsService.findOneByIdOrException(id);
  }

  @ApiOperation({
    summary: 'update run by id',
    description: 'update run by id. with auth. if not exist, 400 error.',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRunDto: UpdateRunDto,
  ) {
    return await this.runsService.update(id, updateRunDto);
  }

  @ApiOperation({
    summary: 'delete run by id',
    description: 'delete run by id. with auth. if not exist, 400 error.',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.runsService.remove(id);
  }
}
