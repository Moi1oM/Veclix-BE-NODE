import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: '업무 자동화',
    description: '태그 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
