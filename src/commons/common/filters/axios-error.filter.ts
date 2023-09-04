import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(AxiosError)
export class AxiosErrorFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Extract the Axios error response
    const axiosResponse = exception.response;

    const status = axiosResponse
      ? axiosResponse.status
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = axiosResponse
      ? axiosResponse.data
      : 'An unexpected error occurred';

    response.status(status).json({
      statusCode: status,
      message,
      detail:
        'This is a custom error message from the AxiosErrorFilter. If you see this, it means that the error was occured from the axios request.',
      timestamp: new Date().toISOString(),
    });
  }
}
