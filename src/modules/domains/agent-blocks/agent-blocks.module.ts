import { Logger, Module, forwardRef } from '@nestjs/common';
import { AgentBlocksService } from './services/agent-blocks.service';
import { AgentBlocksController } from './agent-blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentBlock } from './entities/agent-block.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import ReviewsModule from '../reviews/reviews.module';
import UserScrapsModule from '../user-scraps/user-scraps.module';
import UsersModule from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => ReviewsModule),
    UsersModule,
    TypeOrmModule.forFeature([AgentBlock]),
    AuthModule,
    UserScrapsModule,
  ],
  controllers: [AgentBlocksController],
  providers: [AgentBlocksService, Logger],
  exports: [AgentBlocksService],
})
export default class AgentBlocksModule {}
