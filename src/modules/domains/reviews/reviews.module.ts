import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { AgentBlocksModule } from '../agent-blocks/agent-blocks.module';

@Module({
  imports: [
    forwardRef(() => AgentBlocksModule),
    TypeOrmModule.forFeature([Review]),
    AuthModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
