import { Module } from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { CyclesController } from './cycles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './entities/cycle.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { AgentBlocksModule } from '../agent-blocks/agent-blocks.module';
import { TaskBlocksModule } from '../task-blocks/task-blocks.module';
import { EmpAgentsModule } from '../emp-agents/emp-agents.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cycle]),
    AuthModule,
    AgentBlocksModule,
    TaskBlocksModule,
    EmpAgentsModule,
    MessagesModule,
  ],
  controllers: [CyclesController],
  providers: [CyclesService],
  exports: [CyclesService],
})
export class CyclesModule {}
