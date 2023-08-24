import { Logger, Module } from '@nestjs/common';
import { TaskBlocksService } from './task-blocks.service';
import { TaskBlocksController } from './task-blocks.controller';

@Module({
  controllers: [TaskBlocksController],
  providers: [TaskBlocksService, Logger],
})
export class TaskBlocksModule {}
