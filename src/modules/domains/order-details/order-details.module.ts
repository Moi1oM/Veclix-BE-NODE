import { Module, forwardRef } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { AuthModule } from 'src/modules/functions/auth/auth.module';
import OrdersModule from '../orders/orders.module';
import AgentBlocksModule from '../agent-blocks/agent-blocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    AuthModule,
    forwardRef(() => OrdersModule),
    AgentBlocksModule,
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export default class OrderDetailsModule {}
