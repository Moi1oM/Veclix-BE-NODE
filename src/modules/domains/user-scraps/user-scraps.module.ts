import { Module } from '@nestjs/common';
import { UserScrapsService } from './user-scraps.service';
import { UserScrapsController } from './user-scraps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserScrap } from './entities/user-scrap.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserScrap]), AuthModule],
  controllers: [UserScrapsController],
  providers: [UserScrapsService],
  exports: [UserScrapsService],
})
export default class UserScrapsModule {}
