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
import { ToolBlockProperties } from './tool-block.schema';
import { User } from '../../users/entities/user.entity';
import { TaskBlock } from '../../task-blocks/entities/task-block.entity';

@Entity('tool_blocks')
export class ToolBlock {
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
  properties: ToolBlockProperties;

  @Column('text', { array: true, nullable: true, default: [] })
  contents: string[];

  // RELATIONS
  @ManyToOne(() => User)
  @JoinColumn({ name: 'crafter' })
  crafter: Promise<User>;

  @ManyToOne(() => TaskBlock, (taskBlock) => taskBlock.toolBlocks)
  @JoinColumn({ name: 'task_block' })
  taskBlock: Promise<TaskBlock>;
}
