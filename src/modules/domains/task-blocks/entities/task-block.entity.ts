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
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';
import { User } from '../../users/entities/user.entity';
import { TaskBlockProperties } from './task-block.schema';
import { ToolBlock } from '../../tool-blocks/entities/tool-block.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { Run } from '../../runs/entities/run.entity';

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

  @Column('int4', { nullable: true })
  crafterId: string;

  @Column('uuid', { nullable: true })
  agentBlockId: string;

  // RELATIONS
  @ManyToOne(() => User)
  @JoinColumn({ name: 'crafterId' })
  crafter: Promise<User>;

  @ManyToOne(() => AgentBlock, (agentBlock) => agentBlock.taskBlocks)
  @JoinColumn({ name: 'agentBlockId' })
  agentBlock: Promise<AgentBlock>;

  @OneToMany(() => ToolBlock, (toolBlock) => toolBlock.taskBlock)
  toolBlocks: ToolBlock[];

  @OneToMany(() => Cycle, (cycle) => cycle.currentTask)
  cycles: Cycle[];

  @OneToMany(() => Run, (run) => run.taskBlock)
  runs: Run[];
}
