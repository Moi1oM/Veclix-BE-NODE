import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';

@Entity()
export class OrderDetails {
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
  @Column({ type: 'float', nullable: true, default: 0 })
  discount: number;

  @Column({ type: 'int', nullable: true, default: 365 })
  period: number; // Period in number of days

  // RELATIONS
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => AgentBlock, (agent) => agent.orderDetails, {
    eager: true,
  })
  @JoinColumn()
  agent: AgentBlock;
}
