import { PartialType } from '@nestjs/mapped-types';
import { CreateVoiceToneDto } from './create-voice-tone.dto';

export class UpdateVoiceToneDto extends PartialType(CreateVoiceToneDto) {}
