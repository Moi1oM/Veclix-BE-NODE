import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RunsService } from './runs.service';
import { RunsController } from './runs.controller';
import { Run } from './entities/run.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import CyclesModule from '../cycles/cycles.module';
import TaskBlocksModule from '../task-blocks/task-blocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Run]),
    AuthModule,
    CyclesModule,
    TaskBlocksModule,
  ],
  controllers: [RunsController],
  providers: [RunsService],
  exports: [RunsService],
})
export default class RunsModule {}
