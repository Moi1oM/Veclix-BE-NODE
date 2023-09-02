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
import { Tool } from '../../tools/entities/tool.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserTool {
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
  @Column('jsonb', { nullable: true })
  metadata: JSON;

  @Column({ type: 'uuid', nullable: true })
  tool_id: string;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @Column({ type: 'varchar', default: false })
  tool_set: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  // RELATIONS
  @ManyToOne(() => Tool, (tool) => tool.userTools, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @ManyToOne(() => User, (user) => user.userTools, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
