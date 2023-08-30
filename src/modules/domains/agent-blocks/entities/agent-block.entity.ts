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
import { User } from '../../users/entities/user.entity';
import { TaskBlock } from '../../task-blocks/entities/task-block.entity';
import { AgentBlockProperties } from './agent-block.schema';
import { AgentTag } from '../../agent_tags/entities/agent_tag.entity';
import { Review } from '../../reviews/entities/review.entity';
import { OrderDetails } from '../../order-details/entities/order-detail.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
@Entity('agent_blocks')
export class AgentBlock {
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
  @Column('jsonb', { default: {}, nullable: true })
  properties: AgentBlockProperties;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  contents: string[];

  @Column('text')
  detail: string;

  @Column('float', { default: 0 })
  stars: number;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  price: string;

  @Column('float', { default: 0 })
  realPrice: number;

  @Column('boolean', { default: false })
  inStore: boolean;

  @Column('text')
  thumbnail_img: string;

  // RELATIONS
  @ManyToOne(() => User, (user) => user.agentBlocks)
  @JoinColumn({ name: 'crafter' })
  crafter: Promise<User>;

  @OneToMany(() => TaskBlock, (taskBlock) => taskBlock.agentBlock)
  taskBlocks: TaskBlock[];

  @OneToMany(() => AgentTag, (agentTag) => agentTag.agentBlock)
  agentTags: AgentTag[];

  @OneToMany(() => Review, (review) => review.agentBlock)
  reviews: Review[];

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.agent)
  orderDetails: OrderDetails[];

  @OneToMany(() => Cycle, (cycle) => cycle.agentBlock)
  cycles: Cycle[];
}
