import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { AgentBlocksService } from '../agent-blocks/services/agent-blocks.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly agentBlocksService: AgentBlocksService,
  ) {}

  async findReviewByIdOrException(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id: id } });
    if (!review) {
      throw new HttpException(
        `Review with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return review;
  }

  async findReviewByIdAndUserIdOrException(
    id: number,
    userId: number,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id, user_id: userId },
    });
    if (!review) {
      throw new HttpException(
        `Review with id:${id} with this user not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return review;
  }

  async create(review: Review): Promise<Review> {
    const existingReview = await this.reviewRepository.findOne({
      where: { user_id: review.user_id },
    });
    if (existingReview) {
      throw new HttpException(
        `Review with this user already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const agentBlock =
      await this.agentBlocksService.findOneByAgentIdOrException(
        review.agent_uuid,
      );
    review.agentBlock = agentBlock;
    return await this.reviewRepository.save(review);
  }

  async findMyReviews(user_id: number): Promise<Review[]> {
    return await this.reviewRepository.find({ where: { user_id: user_id } });
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }

  async authorizeReview(id: number, userId: number): Promise<Review> {
    const review = await this.findReviewByIdOrException(id);
    if (review.user_id != userId) {
      throw new HttpException(
        `Review with id:${id} does not belong to this user`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return review;
  }

  async update(
    id: number,
    userId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    // Authorization check
    await this.authorizeReview(id, userId);

    await this.reviewRepository.update(id, updateReviewDto);

    const updatedReview = await this.reviewRepository.findOne({
      where: { id: id },
    });

    if (!updatedReview) {
      throw new BadRequestException('Review not found after update');
    }

    return updatedReview;
  }
  async remove(id: number, userId: number): Promise<Review> {
    const review = await this.authorizeReview(id, userId);
    await this.reviewRepository.delete(id);
    return review;
  }
}
