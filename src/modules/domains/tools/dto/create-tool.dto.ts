import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiOwner } from '../../tool-blocks/entities/tool-block.schema';

export class CreateToolDto {
  @ApiProperty({
    description: 'The api_key_required of the Tool',
    type: Boolean,
    required: true,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  api_key_required: boolean;

  @ApiProperty({
    description: 'The tags of the Tool',
    type: [String],
    required: true,
    example: ['notion', 'output tool'],
  })
  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty({
    description: 'The custom_funciton of the Tool',
    type: String,
    required: true,
    example: 'custom_funciton',
  })
  @IsString()
  @IsNotEmpty()
  custom_funciton: string;

  @ApiProperty({
    description: 'The api_owner of the Tool',
    type: String,
    required: true,
    example: 'User',
  })
  @IsString()
  @IsNotEmpty()
  api_owner: ApiOwner;

  @ApiProperty({
    description: 'the name of the function in llm server',
    type: String,
    required: true,
    example: 'appendHeaderToNotionPage',
  })
  @IsString()
  @IsNotEmpty()
  function_name: string;

  @ApiProperty({
    description: 'The name of the Tool',
    type: String,
    required: true,
    example: 'Append header block to notion page',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the Tool',
    type: String,
    required: true,
    example: '노션 페이지에 헤더 블럭을 추가한다.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The required_key of the Tool',
    type: [String],
    required: true,
    example: ['access_token'],
  })
  @IsArray()
  @IsNotEmpty()
  required_key: string[];

  @ApiProperty({
    description: 'The tool_set of the Tool',
    type: String,
    required: true,
    example: 'notion',
  })
  @IsString()
  @IsNotEmpty()
  tool_set: string;
}
