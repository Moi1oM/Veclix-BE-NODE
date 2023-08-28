import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async updateOrderTotalAmount(
    orderId: number,
    newAmount: number,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    order.totalAmount += newAmount;
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async createEmptyOrder(userId: number) {
    const newOrder = await this.orderRepository.save({
      userId: userId,
      paid: false,
      totalAmount: 0,
    });
    return newOrder;
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findMyOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        userId: userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.delete(id);
  }

  async getRecentNotPaidOrderWithUserId(userId: number): Promise<Order> {
    const recentOrder = await this.orderRepository.findOne({
      where: {
        userId: userId,
        paid: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!recentOrder) {
      const newOrder = await this.createEmptyOrder(userId);
      return newOrder;
    }
    return recentOrder;
  }

  async checkOrderBelongsToUser(
    orderId: number,
    userId: number,
  ): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    const isUserOrder = order.userId === userId;
    if (!isUserOrder) {
      throw new HttpException(
        'order does not belong to user',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
