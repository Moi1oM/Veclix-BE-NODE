import { Module } from '@nestjs/common';
import { AgentBlocksService } from './agent-blocks.service';
import { AgentBlocksController } from './agent-blocks.controller';

@Module({
  controllers: [AgentBlocksController],
  providers: [AgentBlocksService]
})
export class AgentBlocksModule {}
