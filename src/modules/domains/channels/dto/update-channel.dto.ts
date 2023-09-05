import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChannelDto {
  @ApiProperty({
    description: 'Name of the channel',
    example: 'Channel 1',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the channel',
    example: 'This is a channel',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
