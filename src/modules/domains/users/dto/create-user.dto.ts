import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'hcloud0806@gmail.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'moi',
    description: 'username',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

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

  //write a method to convert to entity
  toEntity() {
    const user = new User();
    user.email = this.email;
    user.username = this.username;
    user.avatar_url = this.avatar_url;
    user.discordId = this.discordId;
    user.vcoin = 0;
    return user;
  }

  static toEntity(email: string) {
    const user = new User();
    user.email = email;
    user.username = 'default username';
    user.avatar_url = 'default avatar_url';
    user.discordId = null;
    user.vcoin = 0;
    return user;
  }
}
