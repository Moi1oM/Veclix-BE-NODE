import { TaskBlockProperties } from './../entities/task-block.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskBlockDto {
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
}
