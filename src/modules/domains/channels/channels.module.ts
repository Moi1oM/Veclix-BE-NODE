import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { AuthModule } from '../../functions/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AuthModule],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export default class ChannelsModule {}
