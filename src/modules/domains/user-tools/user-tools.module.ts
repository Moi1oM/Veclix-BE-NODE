import { Module } from '@nestjs/common';
import { UserToolsService } from './user-tools.service';
import { UserToolsController } from './user-tools.controller';

@Module({
  controllers: [UserToolsController],
  providers: [UserToolsService]
})
export class UserToolsModule {}
