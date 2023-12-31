import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskBlockDto } from './create-task-block.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskBlockProperties } from '../entities/task-block.schema';

export class UpdateTaskBlockDto {
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
  properties?: TaskBlockProperties;

  @ApiPropertyOptional({
    example: ['uuid of tool1 id', 'uuid of tool2 id'],
    description: 'The uuids of the task block',
    type: 'array',
    required: false,
  })
  contents?: string[];
}
