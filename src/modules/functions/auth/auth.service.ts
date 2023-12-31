import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/modules/domains/users/entities/user.entity';
import { UsersService } from '../../domains/users/services/users.service';
import { CompanyUser } from '../../domains/company-users/entities/company-user.entity';
import { CompanyUsersService } from '../../domains/company-users/company-users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companyUsersService: CompanyUsersService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateCompany(token: string, provider: string): Promise<CompanyUser> {
    let email: string;
    // email = await this.getEmailFromProvider(provider, token);
    try {
      email = await this.getEmailFromProvider(provider, token);
    } catch (error) {
      throw new UnauthorizedException(
        `Error occurred while validating ${provider} token : ${error.message}`,
      );
    }
    // access npm install cache-manager cache-manager-redis-store @nestjs/commontoken을 company user로 변환
    return await this.companyUsersService.findOneByEmailOrCreate(email);
  }

  async validateUser(token: string, provider: string): Promise<User> {
    // 각 서버로부터 access token을 email로 변환
    let email: string;
    // email = await this.getEmailFromProvider(provider, token);
    try {
      this.logger.log(`provider: ${provider}, token: ${token}`);
      email = await this.getEmailFromProvider(provider, token);
    } catch (error) {
      throw new UnauthorizedException(
        `Error occured while validating ${provider} token : ${error.message}`,
      );
    }
    // email로 user를 찾거나 없으면 생성
    // user 반환
    return await this.usersService.findByEmailOrCreate(email);
  }

  private async getEmailFromProvider(
    provider: string,
    token: string,
  ): Promise<string | null> {
    const providerVerifiers: Record<
      string,
      (token: string) => Promise<string | null>
    > = {
      google: this.verifyGoogleToken,
      discord: this.verifyDiscordToken,
    };

    const verifyFunction = providerVerifiers[provider];
    // console.log(verifyFunction);
    if (!verifyFunction) {
      return null;
    }

    return await verifyFunction(token);
  }

  async verifyGoogleToken(token: string): Promise<string | null> {
    const headers = { Authorization: `Bearer ${token}` };
    // console.log(headers);
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        // method: 'get',
        // url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: headers,
      },
    );
    if (response.status !== 200) {
      this.logger.error(response.data);
      return null;
    }
    return response.data.email;
  }
  async verifyDiscordToken(token: string): Promise<string> {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios({
      method: 'get',
      url: 'https://discord.com/api/users/@me',
      headers: headers,
    });
    if (response.status !== 200) {
      this.logger.error(response.data);
      return null;
    }
    return response.data.email;
  }
}
