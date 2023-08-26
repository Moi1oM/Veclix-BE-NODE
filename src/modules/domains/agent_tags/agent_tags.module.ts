import { Module } from '@nestjs/common';
import { AgentTagsService } from './services/agent_tags.service';
import { AgentTagsController } from './agent_tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentTag } from './entities/agent_tag.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { TagsModule } from '../tags/tags.module';
import { AgentBlocksModule } from '../agent-blocks/agent-blocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentTag]),
    AuthModule,
    TagsModule,
    AgentBlocksModule,
  ],
  controllers: [AgentTagsController],
  providers: [AgentTagsService],
})
export class AgentTagsModule {}
