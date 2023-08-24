import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/domains/users/entities/user.entity';
import { UsersModule } from 'src/modules/domains/users/users.module';
import { BasicAuthGuard } from './guard/basic-auth.guard';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
