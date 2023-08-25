import { TaskBlockProperties } from './../entities/task-block.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { TaskBlock } from '../entities/task-block.entity';
import { User } from '../../users/entities/user.entity';

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

  @ApiProperty({
    example: '3f9af69a-6fa6-4237-a787-2b3330632ebc',
    description: 'The uuid of the agent block',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  agent_uuid: string;

  toEntity(user: User) {
    const taskBlock = new TaskBlock();
    taskBlock.properties = this.properties;
    taskBlock.contents = [];
    taskBlock.crafter = Promise.resolve(user);
    return taskBlock;
  }
}
