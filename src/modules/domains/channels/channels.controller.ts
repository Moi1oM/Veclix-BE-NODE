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
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from '../../functions/auth/guard/basic-auth.guard';
import { CurrentUser } from '../../../commons/common/decorators/user.decorator';
import { CompanyUser } from '../company-users/entities/company-user.entity';

@ApiTags('Channels')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiOperation({
    summary: 'Create channel',
    description: 'Create channel',
    deprecated: true,
  })
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    return await this.channelsService.create(createChannelDto);
  }

  @ApiOperation({
    summary: 'Find my channels',
    description: 'Find my channels. user id is from access token',
    deprecated: true,
  })
  @Get('@me')
  async findMyChannels(@CurrentUser() user: CompanyUser) {
    return await this.channelsService.findMyChannels(user.id);
  }
  @ApiOperation({
    summary: 'Find all channels',
    description: 'Find all channels',
    deprecated: true,
  })
  @Get('all')
  async findAll() {
    return await this.channelsService.findAll();
  }

  @ApiOperation({
    summary: 'Find one channel',
    description: 'Find one channel. It will return 400 if channel not found',
    deprecated: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.channelsService.findOneByIdOrException(+id);
  }

  @ApiOperation({
    summary: 'Update channel',
    description: 'Update channel. It will return 400 if channel not found',
    deprecated: true,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return await this.channelsService.update(+id, updateChannelDto);
  }

  @ApiOperation({
    summary: 'Remove channel',
    description: 'Remove channel. It will return 400 if channel not found',
    deprecated: true,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.channelsService.remove(+id);
  }
}
