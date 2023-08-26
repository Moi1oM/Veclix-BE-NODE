import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AgentTagDQuery {
  @ApiPropertyOptional({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: '에이전트 uuid',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsOptional()
  agent_uuid?: string;

  @ApiPropertyOptional({
    example: '업무 자동화',
    description: '태그 이름',
    type: String,
    required: true,
  })
  @IsString()
  @IsOptional()
  tag_name?: string;
}
