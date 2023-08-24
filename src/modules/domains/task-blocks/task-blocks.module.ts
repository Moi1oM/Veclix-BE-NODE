import { Module } from '@nestjs/common';
import { TaskBlocksService } from './task-blocks.service';
import { TaskBlocksController } from './task-blocks.controller';

@Module({
  controllers: [TaskBlocksController],
  providers: [TaskBlocksService]
})
export class TaskBlocksModule {}
