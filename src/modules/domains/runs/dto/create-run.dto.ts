import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({
    description: 'Cycle id',
    example: 'c1b9d6a0-2f1a-11ec-8d3d-0242ac130003',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  cycleId: string;

  @ApiProperty({
    description: 'Task block id',
    example: 'c1b9d6a0-2f1a-11ec-8d3d-0242ac130003',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  taskBlockId: string;

  @ApiProperty({
    description: 'input datas',
    example: `[{"role": "system", "content": "You are an employed agent whose name is [Summarizing slack channel messages] who helps your employer to achieve their objective."}, {"role": "system", "content": "Our employer has requested that specific messages from a Slack channel be summarized and added to a Notion database at regular intervals. You are expected to execute this workflow based on the scheduler specified by the employer. The workflow consists of the following tasks:\nTASK #1. Determine the employer's desired Slack channel ID, Notion database ID, and establish a work schedule.\nTASK #2. Retrieve Slack messages from the Slack API`,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  input: string;

  @ApiProperty({
    description: 'output datas',
    example: `[{"role": "system", "content": "You are an employed agent whose name is [Summarizing slack channel messages] who helps your employer to achieve their objective."}, {"role": "system", "content": "Our employer has requested that specific messages from a Slack channel be summarized and added to a Notion database at regular intervals. You are expected to execute this workflow based on the scheduler specified by the employer. The workflow consists of the following tasks:\nTASK #1. Determine the employer's desired Slack channel ID, Notion database ID, and establish a work schedule.\nTASK #2. Retrieve Slack messages from the Slack API`,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  output: string;

  @ApiProperty({
    description: 'input token',
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  inputToekn: number;

  @ApiProperty({
    description: 'output token',
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  outputToken: number;

  @ApiProperty({
    description: 'output token',
    example: 200,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  totalToken: number;

  @ApiProperty({
    description: 'output token',
    example: '0.23',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  totalCost: string;

  @ApiProperty({
    description: 'time that run takes',
    example: 9.77,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
