import { Module } from '@nestjs/common';
import { EmpAgentsService } from './emp-agents.service';
import { EmpAgentsController } from './emp-agents.controller';

@Module({
  controllers: [EmpAgentsController],
  providers: [EmpAgentsService]
})
export class EmpAgentsModule {}
