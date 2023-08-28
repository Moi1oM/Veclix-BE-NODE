import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetails } from '../../order-details/entities/order-detail.entity';
import { User } from '../../users/entities/user.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity()
export class Order {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  // CUSTOM COLUMNS
  @Column({ type: 'boolean', default: false })
  paid: boolean;

  @Column()
  userId: number;

  // RELATIONS
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, {
    eager: true,
    cascade: true,
  })
  orderDetails: OrderDetails[];

  @Column({ type: 'float' })
  totalAmount: number;

  @ManyToOne(() => Payment, (payment) => payment.order)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  public addNewOrderDetail(orderDetail: OrderDetails) {
    console.log('orderDetail', orderDetail);
    console.log('agent', orderDetail.agent);
    this.orderDetails.push(orderDetail);
    this.totalAmount += orderDetail.agent.realPrice;
  }
}
