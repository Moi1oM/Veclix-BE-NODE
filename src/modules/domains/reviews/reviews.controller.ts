import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('reviews')
@ApiBearerAuth('access-token')
@UseGuards(BasicAuthGuard)
@Controller('v1/reviews')
export class ReviewsController {
  private readonly logger = new Logger(ReviewsController.name);
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({
    summary: '리뷰 생성',
    description:
      '리뷰를 생성합니다. Agent를 사용한 유저만 리뷰를 작성할 수 있습니다.',
  })
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: User,
  ) {
    return this.reviewsService.create(createReviewDto.toEntity(user));
  }

  @ApiOperation({
    summary: '리뷰 전체 조회',
    description: '리뷰 전체를 조회합니다.',
  })
  @Get('all')
  async findAll() {
    return this.reviewsService.findAll();
  }

  @ApiOperation({
    summary: '내 리뷰 조회',
    description:
      '내 리뷰를 조회합니다. 유저 정보는 access-token으로부터 가져옵니다.',
  })
  @Get('@me')
  async findMyReviews(@CurrentUser() user: User) {
    return this.reviewsService.findMyReviews(user.id);
  }

  @ApiOperation({
    summary: '리뷰 조회',
    description:
      '리뷰를 조회합니다. 해당하는 리뷰가 없으면 400 에러를 반환합니다.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findReviewByIdOrException(+id);
  }

  @ApiOperation({
    summary: '리뷰 수정',
    description:
      '리뷰를 수정합니다. 해당하는 리뷰가 없으면 400 에러를 반환합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @CurrentUser() user: User,
  ) {
    return this.reviewsService.update(+id, user.id, updateReviewDto);
  }

  @ApiOperation({
    summary: '리뷰 삭제',
    description:
      '리뷰를 삭제합니다. 해당하는 리뷰가 없으면 400 에러를 반환합니다.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.reviewsService.remove(+id, user.id);
  }
}
