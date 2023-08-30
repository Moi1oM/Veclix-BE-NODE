import { Module } from '@nestjs/common';
import { VoiceToneService } from './voice-tone.service';
import { VoiceToneController } from './voice-tone.controller';

@Module({
  controllers: [VoiceToneController],
  providers: [VoiceToneService]
})
export class VoiceToneModule {}
