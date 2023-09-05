import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateVoiceToneDto } from './dto/create-voice-tone.dto';
import { UpdateVoiceToneDto } from './dto/update-voice-tone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VoiceTone } from './entities/voice-tone.entity';
import { Repository } from 'typeorm';
import { ChannelsService } from '../channels/channels.service';

@Injectable()
export class VoiceToneService {
  constructor(
    @InjectRepository(VoiceTone)
    private readonly voiceToneRepository: Repository<VoiceTone>,
    @Inject(forwardRef(() => ChannelsService))
    private readonly channelService: ChannelsService,
  ) {}

  async create(createVoiceToneDto: CreateVoiceToneDto): Promise<VoiceTone> {
    const channel = await this.channelService.findOneByIdOrException(
      createVoiceToneDto.channelId,
    );
    const data = {
      ...createVoiceToneDto,
      channel: channel,
    };
    return await this.voiceToneRepository.save(data);
  }

  async findAll(): Promise<VoiceTone[]> {
    return await this.voiceToneRepository.find();
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

  async update(
    id: number,
    updateVoiceToneDto: UpdateVoiceToneDto,
  ): Promise<VoiceTone> {
    await this.findOneByIdOrException(id);
    await this.voiceToneRepository.update(id, updateVoiceToneDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: number): Promise<VoiceTone> {
    const voiceTone = await this.findOneByIdOrException(id);
    await this.voiceToneRepository.delete(id);
    return voiceTone;
  }
}
