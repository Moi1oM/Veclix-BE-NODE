import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiOwner } from '../../tool-blocks/entities/tool-block.schema';
import { UserTool } from '../../user-tools/entities/user-tool.entity';

@Entity()
export class Tool {
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

  @Column({ type: 'boolean', default: true })
  api_key_required: boolean;

  @Column('text', { array: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  custom_funciton: string;

  @Column({ type: 'text', nullable: true })
  function_name: string;

  @Column({ type: 'enum', enum: ApiOwner, default: ApiOwner.User })
  api_owner: ApiOwner;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column('text', { array: true })
  required_key: string[];

  @Column({ type: 'varchar', nullable: true })
  tool_set: string;

  // RELATIONS
  @OneToMany(() => UserTool, (userTool) => userTool.tool)
  userTools: UserTool[];
}
