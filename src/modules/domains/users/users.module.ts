import { Logger, Module, forwardRef } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { UsersRelatedAgentBlockService } from './services/usersAgentBlock.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, Logger, UsersRelatedAgentBlockService],
  exports: [UsersService, UsersRelatedAgentBlockService],
})
export default class UsersModule {}
