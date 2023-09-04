import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CycleStatus, CycleTimeZones, CycleType } from '../entities/cycle.enum';

export class CycleQuery {
  @ApiPropertyOptional({
    description: 'The status of the Cycle',
    type: String,
    required: true,
    example: 'waiting',
  })
  @IsOptional()
  @IsString()
  status: CycleStatus;

  @ApiPropertyOptional({
    description: 'The type of the Cycle',
    type: String,
    required: true,
    example: 'parent',
  })
  @IsOptional()
  @IsString()
  type: CycleType;

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
    description: 'The timezone of the Cycle',
    type: String,
    required: true,
    example: 'Asia/Seoul',
  })
  @IsOptional()
  @IsString()
  timezone: CycleTimeZones;
}
