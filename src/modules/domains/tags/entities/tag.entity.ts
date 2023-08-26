import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AgentTag } from '../../agent_tags/entities/agent_tag.entity';

@Entity('tags')
export class Tag {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  // CUSTOM COLUMNS
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  // RELATIONS
  @OneToMany(() => AgentTag, (agentTag) => agentTag.tag)
  agentTags: AgentTag[];
}
