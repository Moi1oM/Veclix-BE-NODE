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
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';
import { User } from '../../users/entities/user.entity';
import { TaskBlockProperties } from './task-block.schema';

@Entity('task_blocks')
export class TaskBlock {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  // CUSTOME COLUMNS
  @Column('json', { nullable: true })
  properties: TaskBlockProperties;

  @Column('text', { array: true, nullable: true, default: [] })
  contents: string[];

  // RELATIONS
  @ManyToOne(() => User)
  @JoinColumn({ name: 'crafter' })
  crafter: Promise<User>;

  @ManyToOne(() => AgentBlock, (agentBlock) => agentBlock.taskBlocks)
  @JoinColumn({ name: 'agent_block' })
  agentBlock: Promise<AgentBlock>;
}
