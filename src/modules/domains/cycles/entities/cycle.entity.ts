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
import { CycleStatus, CycleTimeZones, CycleType } from './cycle.enum';
import { TaskBlock } from '../../task-blocks/entities/task-block.entity';
import { Run } from '../../runs/entities/run.entity';
import { Message } from '../../messages/entities/message.entity';
@Entity()
export class Cycle {
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
  @Column({ type: 'timestamp', nullable: true })
  run_at: Date;

  @Column({ type: 'enum', enum: CycleStatus, default: CycleStatus.waiting })
  status: CycleStatus;

  @Column({ type: 'enum', enum: CycleType, nullable: false })
  type: CycleType;

  @Column({ type: 'uuid', nullable: true })
  parent_cycle_id: string;

  @Column({ type: 'uuid', nullable: false })
  agent_block_id: string;

  @Column({ type: 'uuid', nullable: false })
  current_task_id: string;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @Column({
    type: 'enum',
    enum: CycleTimeZones,
    default: CycleTimeZones['Asia/Seoul'],
  })
  timezone: CycleTimeZones;

  // RELATIONS
  @ManyToOne(() => AgentBlock, (agentBlock) => agentBlock.cycles)
  @JoinColumn({ name: 'agent_block_id' })
  agentBlock: Promise<AgentBlock>;

  @ManyToOne(() => TaskBlock, (taskBlock) => taskBlock.cycles)
  @JoinColumn({ name: 'current_task_id' })
  currentTask: Promise<TaskBlock>;

  @OneToMany(() => Cycle, (cycle) => cycle.parentCycle)
  childCycles: Promise<Cycle[]>;

  @ManyToOne(() => Cycle, (cycle) => cycle.childCycles)
  @JoinColumn({ name: 'parent_cycle_id' })
  parentCycle: Promise<Cycle>;

  @OneToMany(() => Run, (run) => run.cycle)
  runs: Promise<Run[]>;

  @OneToMany(() => Message, (message) => message.cycle)
  messages: Promise<Message[]>;
}
