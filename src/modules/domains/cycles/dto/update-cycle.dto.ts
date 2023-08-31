import { PartialType } from '@nestjs/mapped-types';
import { CreateCycleDto } from './create-cycle.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCycleDto {
  @ApiPropertyOptional({
    description: 'The run_at of the Cycle',
    type: Date,
    required: true,
    example: '2021-08-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  run_at: Date;

  @ApiPropertyOptional({
    description: 'The status of the Cycle',
    type: String,
    required: true,
    example: 'waiting',
  })
  @IsOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional({
    description: 'The type of the Cycle',
    type: String,
    required: true,
    example: 'parent',
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional({
    description: 'The parent_cycle_id of the Cycle',
    type: String,
    required: true,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @IsUUID()
  parent_cycle_id: string;

  @ApiPropertyOptional({
    description: 'The agent_block_id of the Cycle',
    type: String,
    required: true,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @IsUUID()
  agent_block_id: string;

  @ApiPropertyOptional({
    description: 'The current_task_id of the Cycle',
    type: String,
    required: true,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @IsUUID()
  current_task_id: string;

  @ApiPropertyOptional({
    description: 'The memo of the Cycle',
    type: String,
    required: false,
    example: 'memo',
  })
  @IsString()
  memo: string;

  @ApiPropertyOptional({
    description: 'The timezone of the Cycle',
    type: String,
    required: true,
    example: 'Asia/Seoul',
  })
  @IsOptional()
  @IsString()
  timezone: string;
}
