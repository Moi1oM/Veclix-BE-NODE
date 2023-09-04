import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoiceToneService } from './voice-tone.service';
import { CreateVoiceToneDto } from './dto/create-voice-tone.dto';
import { UpdateVoiceToneDto } from './dto/update-voice-tone.dto';

@Controller('v1/voice-tone')
export class VoiceToneController {
  constructor(private readonly voiceToneService: VoiceToneService) {}

  @Post()
  create(@Body() createVoiceToneDto: CreateVoiceToneDto) {
    return this.voiceToneService.create(createVoiceToneDto);
  }

  @Get()
  findAll() {
    return this.voiceToneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voiceToneService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVoiceToneDto: UpdateVoiceToneDto,
  ) {
    return this.voiceToneService.update(+id, updateVoiceToneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voiceToneService.remove(+id);
  }
}
