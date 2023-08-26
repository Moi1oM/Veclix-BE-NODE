import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: '리뷰를 작성하는 에이전트의 uuid',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  agent_uuid: string;

  @ApiPropertyOptional({
    example: '리뷰 내용',
    description: '리뷰 내용',
    type: String,
    required: true,
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiPropertyOptional({
    example: '리뷰 제목',
    description: '리뷰 제목',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 4.5,
    description: '리뷰 별점',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  stars: number;
}
