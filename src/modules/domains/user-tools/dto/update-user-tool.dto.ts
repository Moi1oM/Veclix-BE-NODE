import { PartialType } from '@nestjs/mapped-types';
import { CreateUserToolDto } from './create-user-tool.dto';

export class UpdateUserToolDto extends PartialType(CreateUserToolDto) {}
