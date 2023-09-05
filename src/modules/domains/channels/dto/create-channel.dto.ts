import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({
    description: 'Name of the channel',
    example: 'Channel 1',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the channel',
    example: 'This is a channel',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Voice tone id of the channel',
    example: '1',
    required: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  voiceToneId?: number;

  @ApiProperty({
    description: 'Owner id of the channel',
    example: '1',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerId?: number;
}
