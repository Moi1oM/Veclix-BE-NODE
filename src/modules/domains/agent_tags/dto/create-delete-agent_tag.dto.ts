import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrDeleteAgentTagDto {
  @ApiProperty({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: '에이전트 uuid',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  agent_uuid: string;

  @ApiProperty({
    example: '업무 자동화',
    description: '태그 이름',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  tag_name: string;
}
