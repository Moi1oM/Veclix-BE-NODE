import { forwardRef, Module } from '@nestjs/common';
import { VoiceToneService } from './voice-tone.service';
import { VoiceToneController } from './voice-tone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceTone } from './entities/voice-tone.entity';
import { AuthModule } from '../../functions/auth/auth.module';
import ChannelsModule from '../channels/channels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoiceTone]),
    AuthModule,
    forwardRef(() => ChannelsModule),
  ],
  controllers: [VoiceToneController],
  providers: [VoiceToneService],
  exports: [VoiceToneService],
})
export default class VoiceToneModule {}
