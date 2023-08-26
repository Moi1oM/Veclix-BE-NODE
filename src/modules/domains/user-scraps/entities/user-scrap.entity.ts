import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_scrap')
export class UserScrap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: number;

  @Column('uuid')
  agent_uuid: string;
}
