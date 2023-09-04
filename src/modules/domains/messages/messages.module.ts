import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import CyclesModule from '../cycles/cycles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    AuthModule,
    forwardRef(() => CyclesModule),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export default class MessagesModule {}
