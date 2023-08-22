import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentBlockDto } from './create-agent-block.dto';

export class UpdateAgentBlockDto extends PartialType(CreateAgentBlockDto) {}
