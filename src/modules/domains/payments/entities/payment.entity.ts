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
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Payment {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  // CUSTOM COLUMNS
  @Column({ type: 'varchar', nullable: true })
  cardNumber: string;

  @Column({ type: 'varchar', nullable: true })
  expiryDate: string;

  @Column({ type: 'varchar', nullable: true })
  cvv: string;

  @Column({ type: 'varchar', nullable: true })
  provider: string;

  @Column({ type: 'varchar', nullable: true })
  userId: number;

  // RELATIONS
  @ManyToOne(() => User, (user) => user.paymentCards)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Order, (order) => order.payment)
  order: Order;
}
