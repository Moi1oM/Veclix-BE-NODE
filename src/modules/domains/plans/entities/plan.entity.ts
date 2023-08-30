import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyUser } from '../../company-users/entities/company-user.entity';

@Entity()
export class Plan {
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

  @Column({ type: 'float', nullable: false })
  price_year: number;

  @Column({ type: 'float', nullable: false })
  price_month: number;
  // RELATIONS
  @OneToMany(() => CompanyUser, (companyUser) => companyUser.plan)
  companyUsers: CompanyUser[];
}
