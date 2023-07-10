import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal')
  loanAmount!: number;

  @Column('decimal')
  interestRate!: number;

  @CreateDateColumn()
  startDate!: Date;

  @UpdateDateColumn()
  endDate!: Date;
}
