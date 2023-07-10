import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class LoanRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal')
  loanAmount!: number;

  @CreateDateColumn()
  startDate!: Date;

  @UpdateDateColumn()
  endDate!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
