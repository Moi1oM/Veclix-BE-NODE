import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'hcloud0806@gmail.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'moi',
    description: 'username',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'https://avatars.githubusercontent.com/u/48426991?v=4',
    description: 'avatar_url',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiPropertyOptional({
    example: '123456789',
    description: 'discordId',
    required: false,
  })
  @IsString()
  @IsOptional()
  discordId?: string;

  @ApiPropertyOptional({
    example: 1000,
    description: 'vcoin',
  })
  @IsInt()
  @IsOptional()
  vcoin?: number;
}
