import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VoiceTone } from '../../voice-tone/entities/voice-tone.entity';
import { CompanyUser } from '../../company-users/entities/company-user.entity';

@Entity()
export class Channel {
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
  description?: string;

  @Column({ type: 'int', nullable: true })
  voiceToneId?: number;

  @Column({ type: 'int', nullable: true })
  ownerId?: number;

  // RELATIONS
  @OneToOne(() => VoiceTone, (voiceTone) => voiceTone.channel)
  @JoinColumn({ name: 'voiceToneId' })
  voiceTone: VoiceTone;

  @ManyToOne(() => CompanyUser, (companyUser) => companyUser.channels)
  @JoinColumn({ name: 'ownerId' })
  owner: CompanyUser;
}
