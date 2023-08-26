import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UserScrapQuery {
  @ApiPropertyOptional({
    example: 1,
    description: '스크랩하는 유저의 id',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiPropertyOptional({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: '스크랩하는 에이전트의 uuid',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsOptional()
  agent_uuid?: string;
}
