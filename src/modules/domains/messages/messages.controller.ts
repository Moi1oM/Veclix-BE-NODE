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
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('messages')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({
    summary: '메시지 생성',
    description:
      '메시지를 생성합니다. 메시지는 사이클에 종속됩니다. 필수적인 사항들은 전부 넣어주셔야 합니다.',
  })
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @ApiOperation({
    summary: '내 모든 메시지 조회',
    description: '내 메시지를 조회합니다. id는 token을 통해 가져옵니다.',
  })
  @Get('@me')
  async findMyMessage(@CurrentUser() user: User) {
    return await this.messagesService.findMyMessage(user.id);
  }

  @ApiOperation({
    summary: '메시지 조회',
    description: '모든 메시지를 조회합니다.',
  })
  @Get('all')
  async findAll() {
    return await this.messagesService.findAll();
  }

  @ApiOperation({
    summary: '메시지 조회',
    description: '메시지를 id로 조회합니다. 없으면 400 에러를 반환합니다.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.messagesService.findOneByIdOrException(id);
  }

  @ApiOperation({
    summary: '메시지 업데이트',
    description:
      '메시지를 업데이트합니다. id에 해당하는 메세지가 없을 경우 400 에러를 반환합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(id, updateMessageDto);
  }

  @ApiOperation({
    summary: '메시지 삭제',
    description:
      '메시지를 삭제합니다. id에 해당하는 메세지가 없을 경우 400 에러를 반환합니다.',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.messagesService.remove(id);
  }
}
