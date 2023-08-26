import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { AgentBlocksModule } from '../agent-blocks/agent-blocks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), AuthModule, AgentBlocksModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
