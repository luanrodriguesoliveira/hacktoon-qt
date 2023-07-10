import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanRequestDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  purpose: string;
}
