import { Module } from '@nestjs/common';
import { VoiceToneService } from './voice-tone.service';
import { VoiceToneController } from './voice-tone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceTone } from './entities/voice-tone.entity';
import { AuthModule } from '../../functions/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VoiceTone]), AuthModule],
  controllers: [VoiceToneController],
  providers: [VoiceToneService],
  exports: [VoiceToneService],
})
export default class VoiceToneModule {}
