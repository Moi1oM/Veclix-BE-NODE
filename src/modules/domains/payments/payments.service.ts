import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly ordersService: OrdersService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return await this.paymentRepository.save(createPaymentDto);
  }

  async findAll(user: User): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: {
        userId: user.id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async addPaymentToOrder(
    paymentId: string,
    orderId: number,
  ): Promise<Payment> {
    const order = await this.ordersService.findOne(orderId);
    const payment = await this.findOneOrException(paymentId);
    payment.order = order;
    await this.paymentRepository.save(payment);
    return payment;
  }

  async findOneOrException(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id: id } });
    if (!payment) {
      throw new BadRequestException('결제 정보를 찾을 수 없습니다.');
    }
    return payment;
  }

  async remove(id: string): Promise<Payment> {
    const payment = await this.findOneOrException(id);
    await this.paymentRepository.delete(id);
    return payment;
  }
}
