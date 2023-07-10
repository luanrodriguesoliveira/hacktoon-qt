import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  city!: string;

  @Column()
  zipCode!: string;

  @Column()
  state!: string;

  @Column()
  stateName!: string;

  @Column()
  documentNumber!: string;
}
