import { Module } from '@nestjs/common';
import { ToolBlocksService } from './services/tool-blocks.service';
import { ToolBlocksController } from './tool-blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { ToolBlock } from './entities/tool-block.entity';
import TaskBlocksModule from '../task-blocks/task-blocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToolBlock]),
    AuthModule,
    TaskBlocksModule,
  ],
  controllers: [ToolBlocksController],
  providers: [ToolBlocksService],
  exports: [ToolBlocksService],
})
export default class ToolBlocksModule {}
