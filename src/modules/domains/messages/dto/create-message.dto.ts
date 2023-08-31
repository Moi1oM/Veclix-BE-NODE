import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'the cycle id',
    example: '9de2ef33-c87f-4caf-81bb-740823a2d5bc',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  cycle_id: string;

  @ApiProperty({
    description: 'the message role',
    example: 'assistant',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    description: 'the message content',
    example: `{"thought": "The user greeted in English. Let's respond back in English to make them comfortable.", "message": "Hello! How can I assist you today?"}`,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'the message token',
    example: 35,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  token: number;

  @ApiProperty({
    description: 'the message json',
    example: {
      role: 'assistant',
      content:
        '{"thought": "The user greeted in English. Let\'s respond back in English to make them comfortable.", "message": "Hello! How can I assist you today?"}',
    },
    required: true,
  })
  @IsNotEmpty()
  @IsObject()
  message_json: JSON;
}
