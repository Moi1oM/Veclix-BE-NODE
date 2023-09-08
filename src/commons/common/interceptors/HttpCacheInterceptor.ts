import { Injectable, ExecutionContext } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'] || '';
    const key = `${request.method}:${request.url}:${token}`;
    console.log(key);
    return key;
  }
}
