import { Injectable } from '@nestjs/common';
import { CreateVoiceToneDto } from './dto/create-voice-tone.dto';
import { UpdateVoiceToneDto } from './dto/update-voice-tone.dto';

@Injectable()
export class VoiceToneService {
  create(createVoiceToneDto: CreateVoiceToneDto) {
    return 'This action adds a new voiceTone';
  }

  findAll() {
    return `This action returns all voiceTone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voiceTone`;
  }

  update(id: number, updateVoiceToneDto: UpdateVoiceToneDto) {
    return `This action updates a #${id} voiceTone`;
  }

  remove(id: number) {
    return `This action removes a #${id} voiceTone`;
  }
}
