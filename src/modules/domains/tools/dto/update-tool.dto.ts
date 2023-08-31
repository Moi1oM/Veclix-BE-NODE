import { PartialType } from '@nestjs/mapped-types';
import { CreateToolDto } from './create-tool.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateToolDto {
  @ApiPropertyOptional({
    description: 'The api_key_required of the Tool',
    type: Boolean,
    required: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  api_key_required: boolean;

  @ApiPropertyOptional({
    description: 'The tags of the Tool',
    type: [String],
    required: true,
    example: ['notion', 'output tool'],
  })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiPropertyOptional({
    description: 'The custom_funciton of the Tool',
    type: String,
    required: true,
    example: 'custom_funciton',
  })
  @IsString()
  @IsOptional()
  custom_funciton: string;

  @ApiPropertyOptional({
    description: 'The api_owner of the Tool',
    type: String,
    required: true,
    example: 'User',
  })
  @IsString()
  @IsOptional()
  api_owner: string;

  @ApiPropertyOptional({
    description: 'the name of the function in llm server',
    type: String,
    required: true,
    example: 'appendHeaderToNotionPage',
  })
  @IsString()
  @IsOptional()
  function_name: string;

  @ApiPropertyOptional({
    description: 'The name of the Tool',
    type: String,
    required: true,
    example: 'Append header block to notion page',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the Tool',
    type: String,
    required: true,
    example: '노션 페이지에 헤더 블럭을 추가한다.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'The required_key of the Tool',
    type: [String],
    required: true,
    example: ['access_token'],
  })
  @IsArray()
  @IsOptional()
  required_key: string[];

  @ApiPropertyOptional({
    description: 'The tool_set of the Tool',
    type: String,
    required: true,
    example: 'notion',
  })
  @IsString()
  @IsOptional()
  tool_set: string;
}
