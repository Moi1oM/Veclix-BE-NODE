import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpAgentDto } from './create-emp-agent.dto';

export class UpdateEmpAgentDto extends PartialType(CreateEmpAgentDto) {}
