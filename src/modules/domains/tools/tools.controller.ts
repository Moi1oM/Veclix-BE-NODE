import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiOperation({
    summary: 'creating tool',
    description: 'creating tool. with auth & post body.',
  })
  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @ApiOperation({
    summary: 'get all tools',
    description: 'get all tools. with auth.',
  })
  @Get('all')
  findAll() {
    return this.toolsService.findAll();
  }

  @ApiOperation({
    summary: 'get tool by id',
    description: 'get tool by id. 400 error if not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOneByIdOrException(id);
  }

  @ApiOperation({
    summary: 'update tool by id',
    description: 'update tool by id. 400 error if not found.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @ApiOperation({
    summary: 'delete tool by id',
    description: 'delete tool by id. 400 error if not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolsService.remove(id);
  }
}
