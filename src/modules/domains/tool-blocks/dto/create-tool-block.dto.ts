import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ToolBlockProperties } from '../entities/tool-block.schema';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ToolBlock } from '../entities/tool-block.entity';
import { User } from '../../users/entities/user.entity';

export class CreateToolBlockDto {
  @ApiPropertyOptional({
    example: {
      function_name: 'function_name',
      description: 'description',
      tool_class_id: 'tool_class_id',
      api_owner: 'Crafter',
      api_key: 'api_key',
    },
    description: 'The contents of the tool block',
    type: 'object',
    required: false,
  })
  properties?: ToolBlockProperties;

  @ApiProperty({
    example: '0d85ab95-fed4-4458-9773-8c801ae35b59',
    description: 'The uuid of the task block',
    type: 'string',
  })
  @IsNotEmpty()
  @IsUUID()
  tool_block_id: string;

  toEntity(user: User) {
    const toolBlock = new ToolBlock();
    toolBlock.properties = this.properties;
    toolBlock.contents = [];
    toolBlock.crafter = Promise.resolve(user);
    return toolBlock;
  }
}
