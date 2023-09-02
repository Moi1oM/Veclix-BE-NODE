import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTool } from './entities/user-tool.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { User } from '../users/entities/user.entity';
interface SlackResponse {
  ok: boolean;
  error?: string;
  [key: string]: any;
}

export interface UserToolResponse {
  userTool: UserTool;
  oauthResposne: SlackResponse | NotionResponse;
}
interface NotionResponse {
  error?: string;
  [key: string]: any;
}

@Injectable()
export class UserToolsService {
  constructor(
    @InjectRepository(UserTool)
    private readonly userToolRepository: Repository<UserTool>,
  ) {}

  async makeSlackOAuthUserTools(
    user: User,
    authCode: string,
  ): Promise<UserToolResponse> {
    const url = 'https://slack.com/api/oauth.v2.access';

    const SLACK_OAUTH_CLIENT_ID = process.env.SLACK_OAUTH_CLIENT_ID;
    const SLACK_OAUTH_CLIENT_SECRET = process.env.SLACK_OAUTH_CLIENT_SECRET;
    const SLACK_OAUTH_REDIRECT_URI = process.env.SLACK_OAUTH_REDIRECT_URI;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const authData = {
      client_id: SLACK_OAUTH_CLIENT_ID,
      client_secret: SLACK_OAUTH_CLIENT_SECRET,
      code: authCode,
      redirect_uri: SLACK_OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    try {
      const response = await axios.post<SlackResponse>(
        url,
        new URLSearchParams(authData).toString(),
        { headers },
      );
      const responseJson = response.data;

      if (!responseJson.ok) {
        throw new Error(responseJson.error);
      }

      const userTool = await this.saveTokenToDb(responseJson, user, 'slack');
      return { userTool, oauthResposne: responseJson };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async saveTokenToDb(
    response,
    user: User,
    toolSetName: string,
  ): Promise<UserTool> {
    const data = {
      metadata: response,
      user_id: user.id,
      user: user,
      tool_set: toolSetName,
    };
    return await this.userToolRepository.save(data);
  }

  async create(createUserToolDto: CreateUserToolDto): Promise<UserTool> {
    return await this.userToolRepository.save(createUserToolDto);
  }

  async findAll(userId: number): Promise<UserTool[]> {
    return await this.userToolRepository.find({
      where: { user_id: userId },
    });
  }

  async findOneByIdOrException(id: number): Promise<UserTool> {
    const userTool = await this.userToolRepository.findOne({
      where: { id: id },
    });
    if (!userTool) {
      throw new HttpException(
        `UserTool with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userTool;
  }

  async update(
    id: number,
    updateUserToolDto: UpdateUserToolDto,
  ): Promise<UserTool> {
    await this.findOneByIdOrException(id);
    await this.userToolRepository.update(id, updateUserToolDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: number): Promise<UserTool> {
    const userTool = await this.findOneByIdOrException(id);
    await this.userToolRepository.delete(id);
    return userTool;
  }

  async makeNotionOAuthUserTools(
    user: User,
    authCode: string,
  ): Promise<UserToolResponse> {
    try {
      const baseUrl = 'https://api.notion.com/v1/oauth/token';
      const notionKey = process.env.NOTION_OAUTH_AUTH_KEY;
      const notionRedirect = process.env.NOTION_OAUTH_REDIRECT_URI;
      const authHeaders = {
        Authorization: `Basic ${notionKey}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      };

      const authData = {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: notionRedirect,
      };

      const authResp = await axios.post<NotionResponse>(
        baseUrl,
        new URLSearchParams(authData).toString(),
        { headers: authHeaders },
      );
      const notionAccessJson = authResp.data;

      if (notionAccessJson.error) {
        throw new Error(notionAccessJson.error);
      }

      notionAccessJson.auth_code = authCode;
      const userTool = await this.saveTokenToDb(
        notionAccessJson,
        user,
        'notion',
      );
      return { userTool, oauthResposne: notionAccessJson };
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
