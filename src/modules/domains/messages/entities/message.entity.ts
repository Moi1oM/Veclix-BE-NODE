import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageRole } from './message.enum';
import { Cycle } from '../../cycles/entities/cycle.entity';

@Entity()
export class Message {
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

  @Column({ type: 'enum', enum: MessageRole })
  role: MessageRole;

  @Column('text')
  content: string;

  @Column('int4')
  token: number;

  @Column({ type: 'jsonb', nullable: true })
  message_json: JSON;

  // RELATIONS
  @ManyToOne(() => Cycle, (cycle) => cycle.messages, {
    onDelete: 'CASCADE',
    eager: true,
  })
  cycle: Cycle;

  // METHODS
}
