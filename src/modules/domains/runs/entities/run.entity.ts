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
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  // CUSTOM COLUMNS

  @Column({ type: 'uuid', nullable: false })
  cycle_id: string;

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
