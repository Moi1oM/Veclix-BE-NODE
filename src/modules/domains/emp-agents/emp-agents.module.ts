import { Module } from '@nestjs/common';
import { EmpAgentsService } from './emp-agents.service';
import { EmpAgentsController } from './emp-agents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpAgent } from './entities/emp-agent.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import AgentBlocksModule from '../agent-blocks/agent-blocks.module';
import ToolBlocksModule from '../tool-blocks/tool-blocks.module';
import TaskBlocksModule from '../task-blocks/task-blocks.module';
import ToolsModule from '../tools/tools.module';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmpAgent]),
    AuthModule,
    AgentBlocksModule,
    ToolBlocksModule,
    TaskBlocksModule,
    ToolsModule,
    UsersModule,
  ],
  controllers: [EmpAgentsController],
  providers: [EmpAgentsService],
  exports: [EmpAgentsService],
})
export default class EmpAgentsModule {}
