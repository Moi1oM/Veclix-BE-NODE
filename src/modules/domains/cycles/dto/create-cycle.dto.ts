import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CycleStatus, CycleTimeZones, CycleType } from '../entities/cycle.enum';

export class CreateCycleDto {
  @ApiProperty({
    description: 'The run_at of the Cycle',
    type: Date,
    required: true,
    example: '2021-08-01T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  run_at: Date;

  @ApiProperty({
    description: 'The status of the Cycle',
    type: String,
    required: true,
    example: 'waiting',
  })
  @IsNotEmpty()
  @IsString()
  status: CycleStatus;

  @ApiProperty({
    description: 'The type of the Cycle',
    type: String,
    required: true,
    example: 'parent',
  })
  @IsNotEmpty()
  @IsString()
  type: CycleType;

  @ApiProperty({
    description: 'The parent_cycle_id of the Cycle',
    type: String,
    required: true,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty()
  @IsUUID()
  parent_cycle_id: string;

  @ApiProperty({
    description: 'The agent_block_id of the Cycle',
    type: String,
    required: true,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty()
  @IsUUID()
  agent_block_id: string;

  @ApiProperty({
    description: 'The current_task_id of the Cycle',
    type: String,
    required: true,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty()
  @IsUUID()
  current_task_id: string;

  @ApiProperty({
    description: 'The memo of the Cycle',
    type: String,
    required: false,
    example: 'memo',
  })
  @IsString()
  memo: string;

  @ApiProperty({
    description: 'The timezone of the Cycle',
    type: String,
    required: true,
    example: 'Asia/Seoul',
  })
  @IsNotEmpty()
  @IsString()
  timezone: CycleTimeZones;
}
