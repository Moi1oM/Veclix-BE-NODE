import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error === 'string') {
      response.status(status).json({
        ok: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
        statusCode: status,
      });
    } else {
      response.status(status).json({
        ok: false,
        timestamp: new Date().toISOString(),
        statusCode: status,
        ...error,
      });
    }
  }
}
