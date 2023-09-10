import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserToolDto } from './dto/create-user-tool.dto';
import { UpdateUserToolDto } from './dto/update-user-tool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTool } from './entities/user-tool.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { User } from '../users/entities/user.entity';
import * as process from 'process';

export interface SlackResponse {
  ok: boolean;
  error?: string;
  [key: string]: any;
}

export interface UserToolResponse {
  userTool: UserTool;
  oauthResponse: SlackResponse | NotionResponse;
}
export interface NotionResponse {
  error?: string;
  [key: string]: any;
}

export interface TwitterMetadata {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

@Injectable()
export class UserToolsService {
  private readonly logger = new Logger(UserToolsService.name);
  constructor(
    @InjectRepository(UserTool)
    private readonly userToolRepository: Repository<UserTool>,
  ) {}

  async getMyTwitterToken(user: User): Promise<UserTool> {
    const twitterToken = await this.userToolRepository.findOne({
      where: { user_id: user.id, tool_set: 'twitter' },
    });
    if (!twitterToken) {
      throw new BadRequestException('this user does not have twitter token');
    }
    return twitterToken;
  }

  async makeTwitterOAuthUserTools(
    user: User,
    code: string,
    verifier: string,
  ): Promise<UserTool> {
    const clientId = process.env.TWITTER_OAUTH_CLIENT_ID;
    const clientSecret = process.env.TWITTER_OAUTH_CLIENT_SECRET; // 새 환경 변수를 추가해야 합니다.
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const url = 'https://api.twitter.com/2/oauth2/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    };
    const data = {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.TWITTER_OAUTH_REDIRECT_URI,
      client_id: clientId,
      code_verifier: verifier,
    };
    this.logger.debug(data, 'data', headers, 'headers');
    const res = await axios.post(url, new URLSearchParams(data), {
      headers,
    });
    this.logger.debug(res.data);
    const responseJson = res.data;
    return await this.saveTokenToDb(responseJson, user, 'twitter');
  }

  async refreshTwitterToken(user: User): Promise<UserTool> {
    const twitterToken = await this.userToolRepository.findOne({
      where: { user_id: user.id, tool_set: 'twitter' },
    });
    if (!twitterToken) {
      throw new BadRequestException('this user does not have twitter token');
    }
    const clientId = process.env.TWITTER_OAUTH_CLIENT_ID;
    const clientSecret = process.env.TWITTER_OAUTH_CLIENT_SECRET; // 새 환경 변수를 추가해야 합니다.
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const url = 'https://api.twitter.com/oauth2/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    };

    const metaData: any = twitterToken.metadata;

    const data = {
      grant_type: 'refresh_token',
      refresh_token: metaData.refresh_token,
    };

    this.logger.debug(data, 'data', headers, 'headers');
    const res = await axios.post(url, new URLSearchParams(data), {
      headers,
    });
    this.logger.debug(res.data);
    const responseJson = res.data;
    return await this.saveTokenToDb(responseJson, user, 'twitter');
  }

  async getMySlackToken(user: User): Promise<UserTool> {
    const slackToken = await this.userToolRepository.findOne({
      where: { user_id: user.id, tool_set: 'slack' },
    });
    if (!slackToken) {
      throw new BadRequestException('this user does not have slack token');
    }
    return slackToken;
  }

  async getMyNotionToken(user: User): Promise<UserTool> {
    const notionToken = await this.userToolRepository.findOne({
      where: { user_id: user.id, tool_set: 'notion' },
    });
    if (!notionToken) {
      throw new BadRequestException('this user does not have notion token');
    }
    return notionToken;
  }
  async makeSlackOAuthUserTools(
    user: User,
    authCode: string,
  ): Promise<SlackResponse> {
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
    // console.log(authData);
    try {
      const response = await axios.post<SlackResponse>(
        url,
        new URLSearchParams(authData).toString(),
        { headers },
      );
      const responseJson = response.data;
      if (!responseJson.ok) {
        this.logger.error(responseJson);
        throw new Error(responseJson.error);
      }

      const userTool = await this.saveTokenToDb(responseJson, user, 'slack');
      return responseJson;
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
  ): Promise<NotionResponse> {
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
      return notionAccessJson;
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
