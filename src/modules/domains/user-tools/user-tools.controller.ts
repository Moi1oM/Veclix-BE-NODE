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
import { UserToolResponse, UserToolsService } from './user-tools.service';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { OauthCodeDto } from './dto/oauth-code.dto';

@ApiTags('user-tools')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('user-tools')
export class UserToolsController {
  constructor(private readonly userToolsService: UserToolsService) {}

  @ApiOperation({
    deprecated: true,
    summary: 'create slack tool with oauth code',
    description:
      'create slack tool with oauth code. it has to be post after get slack oauth code.',
  })
  @Post('slack')
  async createSlackTool(
    @Body() code: OauthCodeDto,
    @CurrentUser() user: User,
  ): Promise<UserToolResponse> {
    return await this.userToolsService.makeSlackOAuthUserTools(user, code.code);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'create notion tool with oauth code',
    description:
      'create notion tool with oauth code. It has to be post after get notion oauth code.',
  })
  @Post('notion')
  async createNotionTool(
    @Body() code: OauthCodeDto,
    @CurrentUser() user: User,
  ): Promise<UserToolResponse> {
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
