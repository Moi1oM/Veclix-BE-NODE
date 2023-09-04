import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyUserDto } from './create-company-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyUserDto {
  @ApiPropertyOptional({
    description: 'Username of the company user',
    example: 'admin',
    required: true,
    type: String,
  })
  @IsOptional()
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
