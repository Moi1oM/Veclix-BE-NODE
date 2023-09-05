import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Basic',
    description: 'The name of the plan',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the plan per year',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price_year: number;

  @ApiProperty({
    example: 10,
    description: 'The price of the plan per month',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price_month: number;
}
