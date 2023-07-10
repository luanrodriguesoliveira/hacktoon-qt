import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Loan } from 'src/entity/loan.entity';
import { CreateLoanDto } from '../dto/loan/create-loan-dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
  ) {}

  async createLoan(data: CreateLoanDto): Promise<Loan> {
    const loanToBeSaved = { ...data };

    const loan = await this.loanRepository.save(
      plainToInstance(Loan, loanToBeSaved),
    );

    return loan;
  }

  async getLoanById(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { id } });

    if (!loan) {
      throw new Error('Loan not found');
    }

    return loan;
  }

  async updateLoan(data: CreateLoanDto, id: string): Promise<Loan> {
    const oldLoan = await this.loanRepository.findOne({
      where: { id },
    });

    if (!oldLoan) {
      throw new Error('Loan not found');
    }

    await this.loanRepository.update({ id }, data);

    const loan = await this.loanRepository.findOne({
      where: { id },
    });

    return loan;
  }

  async deleteLoan(id: string): Promise<void> {
    const loan = await this.loanRepository.findOne({ where: { id } });
    if (!loan) {
      throw new Error('Loan not found');
    }

    await this.loanRepository.delete(id);
  }
}
