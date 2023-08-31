import { PartialType } from '@nestjs/mapped-types';
import { CreateRunDto } from './create-run.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRunDto {
  @ApiPropertyOptional({
    description: 'input datas',
    example: `[{"role": "system", "content": "You are an employed agent whose name is [Summarizing slack channel messages] who helps your employer to achieve their objective."}, {"role": "system", "content": "Our employer has requested that specific messages from a Slack channel be summarized and added to a Notion database at regular intervals. You are expected to execute this workflow based on the scheduler specified by the employer. The workflow consists of the following tasks:\nTASK #1. Determine the employer's desired Slack channel ID, Notion database ID, and establish a work schedule.\nTASK #2. Retrieve Slack messages from the Slack API`,
    required: true,
  })
  @IsOptional()
  @IsString()
  input: string;

  @ApiPropertyOptional({
    description: 'output datas',
    example: `[{"role": "system", "content": "You are an employed agent whose name is [Summarizing slack channel messages] who helps your employer to achieve their objective."}, {"role": "system", "content": "Our employer has requested that specific messages from a Slack channel be summarized and added to a Notion database at regular intervals. You are expected to execute this workflow based on the scheduler specified by the employer. The workflow consists of the following tasks:\nTASK #1. Determine the employer's desired Slack channel ID, Notion database ID, and establish a work schedule.\nTASK #2. Retrieve Slack messages from the Slack API`,
    required: true,
  })
  @IsOptional()
  @IsString()
  output: string;

  @ApiPropertyOptional({
    description: 'input token',
    example: 100,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  inputToekn: number;

  @ApiPropertyOptional({
    description: 'output token',
    example: 100,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  outputToken: number;

  @ApiPropertyOptional({
    description: 'output token',
    example: 200,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  totalToken: number;

  @ApiPropertyOptional({
    description: 'output token',
    example: '0.23',
    required: true,
  })
  @IsOptional()
  @IsString()
  totalCost: string;

  @ApiPropertyOptional({
    description: 'time that run takes',
    example: 9.77,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  duration: number;
}
