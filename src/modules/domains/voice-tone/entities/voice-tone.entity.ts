import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from '../../channels/entities/channel.entity';

@Entity()
export class VoiceTone {
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
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  type: string;

  @Column({ type: 'int4', nullable: true })
  channelId: number;
  // RELATIONS

  @OneToOne(() => Channel, (channel) => channel.voiceTone, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}
