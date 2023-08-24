import { Logger, Module } from '@nestjs/common';
import { TaskBlocksService } from './task-blocks.service';
import { TaskBlocksController } from './task-blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskBlock } from './entities/task-block.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskBlock]), AuthModule],
  controllers: [TaskBlocksController],
  providers: [TaskBlocksService],
})
export class TaskBlocksModule {}
