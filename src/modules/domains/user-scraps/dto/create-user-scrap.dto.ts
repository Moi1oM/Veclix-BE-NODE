import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateUserScrapDto {
  @ApiProperty({
    example: 1,
    description:
      '스크랩하는 유저의 id. 직접 입력하지 않고, access-token에서 가져옵니다.',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: '스크랩하는 에이전트의 uuid',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  agent_uuid: string;
}
