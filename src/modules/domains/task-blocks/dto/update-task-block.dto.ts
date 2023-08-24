import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskBlockDto } from './create-task-block.dto';

export class UpdateTaskBlockDto extends PartialType(CreateTaskBlockDto) {}
