import { Module } from '@nestjs/common';
import { UserToolsService } from './user-tools.service';
import { UserToolsController } from './user-tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTool } from './entities/user-tool.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTool]), AuthModule],
  controllers: [UserToolsController],
  providers: [UserToolsService],
})
export class UserToolsModule {}
