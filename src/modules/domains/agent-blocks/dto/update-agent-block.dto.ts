import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentBlockDto } from './create-agent-block.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AgentBlockProperties } from '../entities/agent-block.schema';
import { User } from '../../users/entities/user.entity';

export class UpdateAgentBlockDto {
  @ApiPropertyOptional({
    example: {
      name: 'Agent Block 1',
      description: 'This is a description',
      objective_prmopt: 'What is your objective?',
    },
    description: 'The contents of the agent block',
    type: 'object',
  })
  @IsOptional()
  properties?: AgentBlockProperties;

  @ApiPropertyOptional({
    example: 'This is a detail of agent block',
    description: 'The detail of the agent block',
    required: true,
  })
  @IsOptional()
  @IsString()
  detail?: string;

  @ApiPropertyOptional({
    example: 'This is a description of agent block',
    description: 'The description of the agent block',
    required: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '10.000 KR',
    description: 'The price of the agent number:string',
    required: true,
  })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiPropertyOptional({
    example: 'https://picsum.photos/id/237/536/354',
    description: 'The thumbnail image of the agent block',
    required: true,
  })
  @IsOptional()
  @IsString()
  thumbnail_img?: string;

  @ApiPropertyOptional({
    example: 10000,
    description: 'The real price of the agent block',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  realPrice?: number;
}
