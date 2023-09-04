import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tool]), AuthModule],
  controllers: [ToolsController],
  providers: [ToolsService],
  exports: [ToolsService],
})
export default class ToolsModule {}
