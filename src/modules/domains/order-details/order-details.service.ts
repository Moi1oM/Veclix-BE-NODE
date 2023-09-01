import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { AgentBlocksService } from '../agent-blocks/services/agent-blocks.service';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    private readonly ordersService: OrdersService,
    private readonly agentBlocksService: AgentBlocksService,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<Order> {
    const recentOrder =
      await this.ordersService.getRecentNotPaidOrderWithUserId(
        createOrderDetailDto.userId,
      );
    const existedOrderDetail = recentOrder.orderDetails;
    // check if the agent_block_id is already in the order
    const isAgentBlockAlreadyInOrder = existedOrderDetail.some(
      (orderDetail) =>
        orderDetail.agent.id === createOrderDetailDto.agent_block_id,
    );
    if (isAgentBlockAlreadyInOrder) {
      throw new HttpException(
        'agent block is already in the order',
        HttpStatus.BAD_REQUEST,
      );
    }
    const agent = await this.agentBlocksService.findOne(
      createOrderDetailDto.agent_block_id,
    );
    // drop the agent_block_id in createOrderDetailDto and agent
    // delete createOrderDetailDto.agent_block_id;
    const newOrderDetail = await this.orderDetailsRepository.save({
      ...createOrderDetailDto,
      order: recentOrder,
      agent: agent,
    });
    const updatedOrder = await this.ordersService.updateOrderTotalAmount(
      recentOrder.id,
      newOrderDetail.agent.realPrice,
    );
    // recentOrder.addNewOrderDetail(newOrderDetail);
    // await this.ordersService.update(+recentOrder.id, recentOrder);
    return updatedOrder;
  }

  async findOrderDetailOrException(id: number): Promise<OrderDetails> {
    const orderDetail = await this.orderDetailsRepository.findOne({
      where: { id: id },
      order: { updatedAt: 'DESC' },
    });
    if (!orderDetail) {
      throw new HttpException('order detail not found', HttpStatus.NOT_FOUND);
    }
    return orderDetail;
  }

  async update(
    id: number,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetails> {
    await this.findOrderDetailOrException(id);
    await this.orderDetailsRepository.update(id, updateOrderDetailDto);
    return await this.findOrderDetailOrException(id);
  }

  async remove(id: number): Promise<OrderDetails> {
    const orderDetail = await this.findOrderDetailOrException(id);
    await this.orderDetailsRepository.delete(id);
    return orderDetail;
  }

  async checkOrderDetailBelongsToUser(
    orderDetailId: number,
    userId: number,
  ): Promise<void> {
    const orderDetail = await this.findOrderDetailOrException(orderDetailId);
    const isUserOrder = orderDetail.order.userId === userId;
    if (!isUserOrder) {
      throw new HttpException(
        'order detail does not belong to user',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
