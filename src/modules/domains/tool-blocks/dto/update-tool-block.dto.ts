import { PartialType } from '@nestjs/mapped-types';
import { CreateToolBlockDto } from './create-tool-block.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToolBlockProperties } from '../entities/tool-block.schema';

export class UpdateToolBlockDto {
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
}
