import { Logger, Module } from '@nestjs/common';
import { AgentBlocksService } from './services/agent-blocks.service';
import { AgentBlocksController } from './agent-blocks.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentBlock } from './entities/agent-block.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([AgentBlock]), AuthModule],
  controllers: [AgentBlocksController],
  providers: [AgentBlocksService, Logger],
  exports: [AgentBlocksService],
})
export class AgentBlocksModule {}
