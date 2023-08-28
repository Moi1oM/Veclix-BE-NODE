import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { OrderDetailsModule } from '../order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule,
    UsersModule,
    forwardRef(() => OrderDetailsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
