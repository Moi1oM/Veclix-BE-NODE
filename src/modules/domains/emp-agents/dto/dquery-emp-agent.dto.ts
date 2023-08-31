import { ApiPropertyOptional } from '@nestjs/swagger';
import { EmpAgentLanguage, EmpAgentStatus } from '../entities/emp-agent.enum';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class EmpAgentQuery {
  @ApiPropertyOptional({
    example: '1',
    description: 'user id',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  ownerId: number;

  @ApiPropertyOptional({
    example: '2bb482f9-a97d-4930-9a3e-42613ae5ae82',
    description: 'agent block uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  agentClassId: string;

  @ApiPropertyOptional({
    example: 'EN',
    description: 'language',
    required: false,
  })
  @IsOptional()
  @IsString()
  language: EmpAgentLanguage;

  @ApiPropertyOptional({
    example: 'github',
    description: 'tool',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'waiting',
    description: 'status',
    required: false,
  })
  @IsOptional()
  @IsString()
  status: EmpAgentStatus;
}
