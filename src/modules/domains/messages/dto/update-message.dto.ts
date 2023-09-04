import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MessageRole } from '../entities/message.enum';

export class UpdateMessageDto {
  @ApiPropertyOptional({
    description: 'the message role',
    example: 'assistant',
    required: true,
  })
  @IsOptional()
  @IsString()
  role: MessageRole;

  @ApiPropertyOptional({
    description: 'the message content',
    example: `{"thought": "The user greeted in English. Let's respond back in English to make them comfortable.", "message": "Hello! How can I assist you today?"}`,
    required: true,
  })
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'the message token',
    example: 35,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  token: number;

  @ApiPropertyOptional({
    description: 'the message json',
    example: {
      role: 'assistant',
      content:
        '{"thought": "The user greeted in English. Let\'s respond back in English to make them comfortable.", "message": "Hello! How can I assist you today?"}',
    },
    required: true,
  })
  @IsOptional()
  @IsObject()
  message_json: JSON;
}
