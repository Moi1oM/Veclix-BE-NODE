import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVoiceToneDto } from './dto/create-voice-tone.dto';
import { UpdateVoiceToneDto } from './dto/update-voice-tone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VoiceTone } from './entities/voice-tone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoiceToneService {
  constructor(
    @InjectRepository(VoiceTone)
    private readonly voiceToneRepository: Repository<VoiceTone>,
  ) {}

  async create(createVoiceToneDto: CreateVoiceToneDto) {
    return 'This action adds a new voiceTone';
  }

  async findAll() {
    return `This action returns all voiceTone`;
  }

  async findOneByIdOrException(id: number): Promise<VoiceTone> {
    const voiceTone = await this.voiceToneRepository.findOne({
      where: { id: id },
    });
    if (!voiceTone) {
      throw new HttpException(
        `Voice tone with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return voiceTone;
  }

  update(id: number, updateVoiceToneDto: UpdateVoiceToneDto) {
    return `This action updates a #${id} voiceTone`;
  }

  remove(id: number) {
    return `This action removes a #${id} voiceTone`;
  }
}
