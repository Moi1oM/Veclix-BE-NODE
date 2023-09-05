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

  @ApiProperty({
    description: 'Voice tone id of the channel',
    example: '1',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsString()
  voiceToneId?: string;

  @ApiProperty({
    description: 'Owner id of the channel',
    example: '1',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  ownerId?: string;
}
