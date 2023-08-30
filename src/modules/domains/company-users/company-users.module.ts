import { Module } from '@nestjs/common';
import { CompanyUsersService } from './company-users.service';
import { CompanyUsersController } from './company-users.controller';

@Module({
  controllers: [CompanyUsersController],
  providers: [CompanyUsersService]
})
export class CompanyUsersModule {}
