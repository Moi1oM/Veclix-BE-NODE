import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { AuthModule } from '../../functions/auth/auth.module';
import CompanyUsersModule from '../company-users/company-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), AuthModule, CompanyUsersModule],
  controllers: [PlansController],
  providers: [PlansService],
})
export default class PlansModule {}
