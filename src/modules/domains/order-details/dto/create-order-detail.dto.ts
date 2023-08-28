import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateOrderDetailDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'The id of the agent. this will be filled in by the server',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: 'The id of the agent',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  agent_block_id: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'The discount of the order detail. Default is 0',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({
    example: 365,
    description: 'The period of the order detail. Default is 365',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  period?: number;

  @ApiPropertyOptional({
    example: 'agent object',
    description: 'The agent object. this will be filled in by the server',
    required: false,
  })
  @IsOptional()
  agent?: any;
}
