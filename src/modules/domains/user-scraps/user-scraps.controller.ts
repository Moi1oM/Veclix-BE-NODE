import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Query,
} from '@nestjs/common';
import { UserScrapsService } from './user-scraps.service';
import { CreateUserScrapDto } from './dto/create-user-scrap.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { UserScrapQuery } from './dto/dquery-user-scrap.dto';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('user-scraps')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/user-scraps')
export class UserScrapsController {
  private readonly logger = new Logger(UserScrapsController.name);
  constructor(private readonly userScrapsService: UserScrapsService) {}

  @ApiOperation({
    summary: '유저 스크랩이 있으면 생성하고, 없으면 삭제합니다.',
    description: '유저 스크랩이 있으면 생성하고, 없으면 삭제합니다.',
  })
  @Post()
  toggle(
    @Body() createUserScrapDto: CreateUserScrapDto,
    @CurrentUser() user: User,
  ) {
    this.logger.log(
      `toggle createUserScrapDto: ${JSON.stringify(createUserScrapDto)}`,
    );
    createUserScrapDto.user_id = user.id;
    return this.userScrapsService.toggleScrap(createUserScrapDto);
  }

  @ApiOperation({
    summary: '유저 스크랩 조회',
    description:
      '유저 스크랩을 조회합니다. Query에 따라서 동적으로 조회합니다. 해당하는 스크랩이 없으면 400 에러를 반환합니다.',
  })
  @Get()
  findByQuery(@Query() query: UserScrapQuery) {
    return this.userScrapsService.findByQuery(query);
  }

  @ApiOperation({
    summary: '유저가 스크랩한 에이전트 반환',
    description:
      '유저가 스크랩한 에이전트를 반환합니다. 유저의 id는 access-token으로 가져옵니다.',
  })
  @Get('@me')
  findUserScrappedAgents(@CurrentUser() user: User) {
    return this.userScrapsService.findUserScrappedAgents(user.id);
  }
}
