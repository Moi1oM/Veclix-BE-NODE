import { PartialType } from '@nestjs/mapped-types';
import { CreateUserToolDto } from './create-user-tool.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserToolDto {
  @ApiPropertyOptional({
    description: 'The user_id of the UserTool',
    type: Number,
    required: true,
    example: '12',
  })
  @IsOptional()
  @IsString()
  user_id: number;

  @ApiPropertyOptional({
    description: 'The metadata of the UserTool',
    type: Object,
    required: true,
    example: {
      access_token: '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',
      token_type: 'bearer',
      scope: null,
    },
  })
  @IsOptional()
  @IsObject()
  metadata: JSON;

  @ApiPropertyOptional({
    description: 'The tool_set of the UserTool',
    type: String,
    required: true,
    example: 'githubOauthTokens',
  })
  @IsOptional()
  @IsString()
  tool_set: string;
}
