import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyUsersService } from '../company-users/company-users.service';
import { VoiceToneService } from '../voice-tone/voice-tone.service';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    private readonly companyUsersService: CompanyUsersService,
    private readonly voiceToneService: VoiceToneService,
  ) {}

  async findMyChannels(userId: number): Promise<Channel[]> {
    const channelList: Channel[] = await this.channelRepository.find({
      where: { ownerId: userId },
    });
    if (channelList.length == 0) {
      throw new HttpException(
        `Channel with userId:${userId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return channelList;
  }

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    const owner = await this.companyUsersService.findOneByIdOrException(
      createChannelDto.ownerId,
    );
    const voiceTone = await this.voiceToneService.findOneByIdOrException(
      createChannelDto.voiceToneId,
    );
    const newChannel = {
      ...createChannelDto,
      owner: owner,
      voiceTone: voiceTone,
    };

    return await this.channelRepository.save(newChannel);
  }

  async findAll(): Promise<Channel[]> {
    return await this.channelRepository.find();
  }

  async findOneByIdOrException(id: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      where: { id: id },
    });
    if (!channel) {
      throw new HttpException(
        `Channel with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return channel;
  }

  async update(
    id: number,
    updateChannelDto: UpdateChannelDto,
  ): Promise<Channel> {
    await this.findOneByIdOrException(id);
    await this.channelRepository.update(id, updateChannelDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: number): Promise<Channel> {
    const channel = await this.findOneByIdOrException(id);
    await this.channelRepository.delete(id);
    return channel;
  }
}
