import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePlanDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the plan',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  planId: number;
}
