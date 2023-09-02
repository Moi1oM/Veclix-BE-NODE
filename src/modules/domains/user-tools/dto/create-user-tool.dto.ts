import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

export class CreateUserToolDto {
  @ApiProperty({
    description: 'The user_id of the UserTool',
    type: Number,
    required: true,
    example: 12,
  })
  @IsNotEmpty()
  @IsString()
  user_id: number;

  @ApiProperty({
    description: 'The tool_id of the UserTool',
    type: String,
    required: true,
    example: 'e45972fa-0d94-42df-ace2-85c3af8a3816',
  })
  @IsNotEmpty()
  @IsUUID()
  tool_id: string;

  @ApiProperty({
    description: 'The metadata of the UserTool',
    type: Object,
    required: true,
    example: {
      access_token: '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',
      token_type: 'bearer',
      scope: null,
    },
  })
  @IsNotEmpty()
  @IsObject()
  metadata: JSON;

  @ApiProperty({
    description: 'The tool_set of the UserTool',
    type: String,
    required: true,
    example: 'githubOauthTokens',
  })
  @IsNotEmpty()
  @IsString()
  tool_set: string;
}
