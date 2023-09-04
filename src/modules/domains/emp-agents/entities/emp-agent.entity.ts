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
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';
import { EmpAgentLanguage, EmpAgentStatus } from './emp-agent.enum';
import { Cycle } from '../../cycles/entities/cycle.entity';

@Entity()
export class EmpAgent {
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
  @Column({ type: 'int4', nullable: false })
  ownerId: number;

  @Column({ type: 'uuid', nullable: false })
  agentClassId: string;

  @Column({ type: 'jsonb', nullable: true })
  schedule?: JSON;

  @Column({
    type: 'enum',
    enum: EmpAgentLanguage,
    default: EmpAgentLanguage.EN,
  })
  language: EmpAgentLanguage;

  @Column('text', { array: true, nullable: true })
  tools: string[];

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: JSON;

  @Column({
    type: 'enum',
    enum: EmpAgentStatus,
    default: EmpAgentStatus.waiting,
  })
  status: EmpAgentStatus;
  // RELATIONS
  @ManyToOne(() => User, (user) => user.empAgents)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ManyToOne(() => AgentBlock, (agentBlock) => agentBlock.empAgents)
  @JoinColumn({ name: 'agentClassId' })
  agentBlock: AgentBlock;

  @OneToMany(() => Cycle, (cycle) => cycle.agentBlock)
  cycles: Cycle[];
}
