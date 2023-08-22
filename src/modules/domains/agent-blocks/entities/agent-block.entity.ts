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
import { User } from '../../users/entities/user.entity';

@Entity('agent_blocks')
export class AgentBlock {
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
  @Column('jsonb', { default: {} })
  properties: any;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  contents: string[];

  @Column({ type: 'uuid', nullable: true })
  parent: string | null;

  @Column('text')
  detail: string;

  @Column('float')
  stars: number;

  @Column('text')
  description: string;

  @Column('text')
  price: string;

  @Column('boolean')
  inStore: boolean;

  @Column('text')
  thumbnail_img: string;

  // RELATIONS
  @ManyToOne(() => User, (user) => user.agentBlocks)
  @JoinColumn({ name: 'crafter' })
  crafter: Promise<User>;

  // @ManyToMany(() => Review)
  // @JoinTable()
  // reviews: Review[];

  // @ManyToMany(() => Tag)
  // @JoinTable()
  // tags: Tag[];
}
