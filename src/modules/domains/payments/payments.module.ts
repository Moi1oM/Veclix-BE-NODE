import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import OrdersModule from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), AuthModule, OrdersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export default class PaymentsModule {}
