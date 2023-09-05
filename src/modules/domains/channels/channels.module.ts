import { forwardRef, Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { AuthModule } from '../../functions/auth/auth.module';
import VoiceToneModule from '../voice-tone/voice-tone.module';
import CompanyUsersModule from '../company-users/company-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    AuthModule,
    forwardRef(() => VoiceToneModule),
    CompanyUsersModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService],
})
export default class ChannelsModule {}
