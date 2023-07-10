import { IsNotEmpty, IsDecimal, IsDate } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsDecimal()
  loanAmount!: number;

  @IsNotEmpty()
  @IsDecimal()
  interestRate!: number;

  @IsNotEmpty()
  @IsDate()
  startDate!: Date;

  @IsNotEmpty()
  @IsDate()
  endDate!: Date;
}
