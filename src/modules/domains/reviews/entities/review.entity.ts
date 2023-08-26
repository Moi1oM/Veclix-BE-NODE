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

@Entity('review')
export class Review {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  // CUSTOME COLUMNS
  @Column()
  user_id: number;

  @Column('uuid')
  agent_uuid: string;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('float')
  stars: number;

  // RELATIONS
  @ManyToOne(() => AgentBlock, (agentBlock) => agentBlock.reviews)
  @JoinColumn({ name: 'agent_uuid' })
  agentBlock: AgentBlock;
}
