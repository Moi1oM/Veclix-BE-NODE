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
import { VoiceToneService } from './voice-tone.service';
import { CreateVoiceToneDto } from './dto/create-voice-tone.dto';
import { UpdateVoiceToneDto } from './dto/update-voice-tone.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from '../../functions/auth/guard/basic-auth.guard';
import { raw } from 'express';

@ApiTags('Voice Tone')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/voice-tone')
export class VoiceToneController {
  constructor(private readonly voiceToneService: VoiceToneService) {}

  @ApiOperation({
    summary: 'Create voice tone',
    description: 'Create voice tone',
  })
  @Post()
  async create(@Body() createVoiceToneDto: CreateVoiceToneDto) {
    return await this.voiceToneService.create(createVoiceToneDto);
  }

  @ApiOperation({
    summary: 'Get all voice tones',
    description: 'Get all voice tones',
  })
  @Get('all')
  async findAll() {
    return await this.voiceToneService.findAll();
  }

  @ApiOperation({
    summary: 'Get voice tone',
    description: 'Get voice tone by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.voiceToneService.findOneByIdOrException(+id);
  }

  @ApiOperation({
    summary: 'Update voice tone',
    description: 'Update voice tone by id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVoiceToneDto: UpdateVoiceToneDto,
  ) {
    return await this.voiceToneService.update(+id, updateVoiceToneDto);
  }

  @ApiOperation({
    summary: 'Delete voice tone',
    description: 'Delete voice tone by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.voiceToneService.remove(+id);
  }
}
