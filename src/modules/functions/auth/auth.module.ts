import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/domains/users/entities/user.entity';
import { BasicAuthGuard } from './guard/basic-auth.guard';
import UsersModule from 'src/modules/domains/users/users.module';
import CompanyUsersModule from '../../domains/company-users/company-users.module';

@Module({
  imports: [forwardRef(() => UsersModule), CompanyUsersModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
