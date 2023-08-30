import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plan } from '../../plans/entities/plan.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity()
export class CompanyUser {
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
  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  username: string;

  @Column({ type: 'int', default: 0 })
  vcoin: number;

  @Column({ type: 'text', nullable: true })
  avatar_url?: string;

  @Column({ type: 'text', nullable: true })
  discordId?: string;

  @Column({ type: 'jsonb', nullable: true })
  properties?: JSON;

  @Column({ type: 'int', nullable: true })
  planId?: number;

  // RELATIONS
  @OneToMany(() => Channel, (channel) => channel.owner)
  channels: Channel[];

  @ManyToOne(() => Plan, (plan) => plan.companyUsers)
  @JoinColumn({ name: 'planId' })
  plan: Plan;
}
