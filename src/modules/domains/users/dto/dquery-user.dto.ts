import { IsOptional, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserQueryDto {
  @ApiProperty({
    example: 'hcloud0806@gmail.com',
    description: 'email',
    required: false,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'moi',
    description: 'username',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/48426991?v=4',
    description: 'avatar_url',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({
    example: '123456789',
    description: 'discordId',
    required: false,
  })
  @IsString()
  @IsOptional()
  discordId?: string;
}
