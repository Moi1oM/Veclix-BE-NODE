import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isCompany = request.headers.company;
    const token = request.headers.authorization?.split(' ')[1];
    const provider = request.headers.provider;
    if (isCompany && provider && token) {
      request.user = await this.authService.validateCompany(token, provider);
      return Boolean(request.user);
    }

    if (!token || !provider) {
      throw new UnauthorizedException('token or provider is not exist');
    }

    request.user = await this.authService.validateUser(token, provider);
    return Boolean(request.user);
  }
}
