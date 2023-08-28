import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDetailDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'The discount of the order detail. Default is 0',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({
    example: 365,
    description: 'The period of the order detail. Default is 365',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  period?: number;
}
