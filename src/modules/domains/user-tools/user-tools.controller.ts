import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  CacheTTL,
} from '@nestjs/common';
import {
  NotionResponse,
  SlackResponse,
  UserToolResponse,
  UserToolsService,
} from './user-tools.service';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { OauthCodeDto } from './dto/oauth-code.dto';
import { UserTool } from './entities/user-tool.entity';

const oneWeek = 604800;

@ApiTags('user-tools')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/user-tools')
export class UserToolsController {
  constructor(private readonly userToolsService: UserToolsService) {}

  @ApiOperation({
    summary: 'get saved slack token',
    description:
      'get saved slack token. 400 will respond if slack token does not exist.',
  })
  @CacheTTL(oneWeek)
  @Get('slack/@me')
  async getMySlackToken(@CurrentUser() user: User): Promise<UserTool> {
    return await this.userToolsService.getMySlackToken(user);
  }

  @ApiOperation({
    summary: 'get saved notion token',
    description:
      'get saved notion token. 400 will respond if notion token does not exist.',
  })
  @CacheTTL(oneWeek)
  @Get('notion/@me')
  async getMyNotionToken(@CurrentUser() user: User): Promise<UserTool> {
    return await this.userToolsService.getMyNotionToken(user);
  }

  @ApiOperation({
    summary: 'refresh the twitter token',
    description:
      'refresh the twitter token. 400 will respond if twitter token does not exist.',
  })
  @Post('twitter/@me/refresh')
  async refreshTwitterToken(@CurrentUser() user: User): Promise<UserTool> {
    return await this.userToolsService.refreshTwitterToken(user);
  }

  @ApiOperation({
    summary: 'get saved twitter token',
    description:
      'get saved twitter token. 400 will respond if twitter token does not exist.',
  })
  @Get('twitter/@me')
  async getMyTwitterToken(@CurrentUser() user: User): Promise<UserTool> {
    return await this.userToolsService.getMyTwitterToken(user);
  }

  @ApiOperation({
    summary: 'create twitter tool with oauth code',
    description:
      'create twitter tool with oauth code. it has to be post after get twitter oauth code.',
  })
  @Post('twitter')
  async createTwitterTool(
    @Body() code: OauthCodeDto,
    @CurrentUser() user: User,
  ): Promise<UserTool> {
    return await this.userToolsService.makeTwitterOAuthUserTools(
      user,
      code.code,
    );
  }

  @ApiOperation({
    summary: 'create slack tool with oauth code',
    description:
      'create slack tool with oauth code. it has to be post after get slack oauth code.',
  })
  @Post('slack')
  async createSlackTool(
    @Body() code: OauthCodeDto,
    @CurrentUser() user: User,
  ): Promise<SlackResponse> {
    return await this.userToolsService.makeSlackOAuthUserTools(user, code.code);
  }

  @ApiOperation({
    summary: 'create notion tool with oauth code',
    description:
      'create notion tool with oauth code. It has to be post after get notion oauth code.',
  })
  @Post('notion')
  async createNotionTool(
    @Body() code: OauthCodeDto,
    @CurrentUser() user: User,
  ): Promise<NotionResponse> {
    return await this.userToolsService.makeNotionOAuthUserTools(
      user,
      code.code,
    );
  }

  @ApiOperation({
    deprecated: true,
  })
  @Post()
  async create(@Body() createUserToolDto: CreateUserToolDto) {
    return await this.userToolsService.create(createUserToolDto);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get all my tools',
    description: 'get all my tools. user id is from access token.',
  })
  @Get('@me/all')
  async findAll(@CurrentUser() user: User) {
    return await this.userToolsService.findAll(user.id);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userToolsService.remove(+id);
  }
}
