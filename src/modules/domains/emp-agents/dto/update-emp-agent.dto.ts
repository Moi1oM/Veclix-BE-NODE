import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpAgentDto } from './create-emp-agent.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { EmpAgentLanguage, EmpAgentStatus } from '../entities/emp-agent.enum';

export class UpdateEmpAgentDto {
  @ApiPropertyOptional({
    example: {
      start_date: '2023-08-07T16:00:00+09:00',
      cycle_number: 1,
      repeat_interval: 'weekly',
      repeat_daily: ['01:00', '02:00', '03:00', '04:00'],
      repeat_weekly: ['THU', 'FRI', 'MON', 'TUE', 'WED'],
      repeat_monthly: [],
    },
    description: 'schedule',
    required: false,
  })
  @IsOptional()
  @IsObject()
  schedule: JSON;

  @ApiPropertyOptional({
    example: 'EN',
    description: 'language',
    required: false,
  })
  @IsOptional()
  @IsString()
  language: EmpAgentLanguage;

  @ApiPropertyOptional({
    example: ['github', 'slack'],
    description: 'tools',
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  tools: string[];

  @ApiPropertyOptional({
    example: 'test agent',
    description: 'name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'waiting',
    description: 'status',
    required: false,
  })
  @IsOptional()
  @IsString()
  status: EmpAgentStatus;

  @ApiPropertyOptional({
    example: {
      name: 'Slack summarizier',
      title: 'Summarizing slack channel messages',
      description:
        'Summarize slack channel messages every specific time intervals.',
      objective_prompt:
        "Our employer has requested that specific messages from a Slack channel be summarized and added to a Notion database at regular intervals. You are expected to execute this workflow based on the scheduler specified by the employer. The workflow consists of the following tasks:\nTASK #1. Determine the employer's desired Slack channel ID, Notion database ID, and establish a work schedule.\nTASK #2. Retrieve Slack messages from the Slack API that were posted after the previous workflow execution.\nTASK #3. Create a Notion page for the summarized article and create sub-tasks with the content of the Slack message and the links I need to visit and summarize.\nTASK #4. Compose a summarized article about the messages, incorporating external sources.",
    },
    description: 'metadata',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata: JSON;
}
