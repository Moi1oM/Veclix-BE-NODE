import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Review } from '../entities/review.entity';

export class CreateReviewDto {
  @ApiPropertyOptional({
    example: 1,
    description: '리뷰를 작성하는 유저의 id. access-token으로부터 가져옵니다.',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: '리뷰를 작성하는 에이전트의 uuid',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  agent_uuid: string;

  @ApiProperty({
    example: '리뷰 내용',
    description: '리뷰 내용',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '리뷰 제목',
    description: '리뷰 제목',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 4.5,
    description: '리뷰 별점',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  stars: number;

  toEntity(user: User) {
    const { agent_uuid, content, title, stars } = this;
    const review = new Review();
    review.user_id = user.id;
    review.agent_uuid = agent_uuid;
    review.content = content;
    review.title = title;
    review.stars = stars;
    return review;
  }
}
