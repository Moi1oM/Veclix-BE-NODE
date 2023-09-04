import { TaskBlock } from '../../task-blocks/entities/task-block.entity';
import { Cycle } from './../../cycles/entities/cycle.entity';
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

@Entity()
export class Run {
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

  @Column({ type: 'uuid', nullable: false })
  cycle_id: string;

  @Column({ type: 'uuid', nullable: false })
  task_block_id: string;

  @Column({ type: 'text', nullable: true })
  input: string;

  @Column({ type: 'text', nullable: true })
  output: string;

  @Column({ type: 'int4', nullable: false })
  input_toekn: number;

  @Column({ type: 'int4', nullable: false })
  output_token: number;

  @Column({ type: 'int4', nullable: false })
  total_token: number;

  @Column({ type: 'text', nullable: false })
  total_cost: string;

  @Column({ type: 'float4', nullable: true })
  duration: number;

  // RELATIONS
  @ManyToOne(() => Cycle, (cycle) => cycle.runs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'cycle_id' })
  cycle: Cycle;

  @ManyToOne(() => TaskBlock, (taskBlock) => taskBlock.runs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'task_block_id' })
  taskBlock: TaskBlock;
}
