import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoiceToneDto {
  @ApiProperty({
    description: 'Name of the voice tone',
    example: 'Voice tone 1',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Type of the voice tone',
    example: 'Voice tone 1',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Channel id of the voice tone',
    example: 2,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  channelId: number;
}
