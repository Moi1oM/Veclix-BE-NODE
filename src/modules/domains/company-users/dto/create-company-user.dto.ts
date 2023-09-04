import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyUserDto {
  @ApiProperty({
    description: 'Email of the company user',
    example: 'admin@lastoria.me',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username of the company user',
    example: 'admin',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional({
    description: 'Vcoin of the company user',
    example: 0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  vcoin?: number;

  @ApiPropertyOptional({
    description: 'Avatar url of the company user',
    example: 'https://lastoria.me/avatar.png',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiPropertyOptional({
    description: 'Discord id of the company user',
    example: '123456789',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  discordId?: string;

  @ApiPropertyOptional({
    description: 'Properties of the company user',
    example: { foo: 'bar' },
    required: false,
    type: Object,
  })
  @IsOptional()
  @IsObject()
  properties?: JSON;
}
