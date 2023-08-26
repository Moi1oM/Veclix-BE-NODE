import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgentBlock } from '../../agent-blocks/entities/agent-block.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('agent_tags')
export class AgentTag {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  // CUSTOME COLUMNS
  @Column()
  tag_id: number;

  @Column('uuid')
  agent_uuid: string;
  // RELATIONS
  @ManyToOne(() => Tag, (tag) => tag.agentTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @ManyToOne(() => AgentBlock, (agentBlock) => agentBlock.agentTags)
  @JoinColumn({ name: 'agent_uuid' })
  agentBlock: AgentBlock;
}
