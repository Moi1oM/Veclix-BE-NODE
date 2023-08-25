import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TaskBlockQuery {
  @ApiPropertyOptional({
    example: {
      name: 'Task Block 1',
      role_prompt: 'What is your role?',
      quality: 'Eco',
    },
    description: 'The contents of the task block',
    type: 'object',
    required: false,
  })
  @IsOptional()
  properties?: any;

  @ApiPropertyOptional({
    example: ['uuid of tool1 id', 'uuid of tool2 id'],
    description: 'The uuids of the task block',
    type: 'array',
    required: false,
  })
  @IsOptional()
  contents?: string[];
}
