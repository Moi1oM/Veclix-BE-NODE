import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('healthCheck')
  @Get('/ping')
  healthCheck(): string {
    return this.appService.getPong();
  }
}
