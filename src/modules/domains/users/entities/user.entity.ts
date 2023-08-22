import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';

@Entity('users')
export class User extends BaseEntity {
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
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'int', default: 0 })
  vcoin: number;

  @Column({ type: 'varchar', nullable: true })
  avatar_url?: string;

  @Column({ type: 'varchar', nullable: true })
  discordId?: string;

  // RELATIONS
  @OneToMany(() => AgentBlock, (agentBlock) => agentBlock.crafter, {
    eager: true,
  })
  agentBlocks: AgentBlock[];
}
