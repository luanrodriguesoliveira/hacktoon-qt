import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanRequest } from '../entity/loan-request.entity';
import { plainToInstance } from 'class-transformer';
import { Loan } from 'src/entity/loan.entity';
import { CreateLoanRequestDto } from 'src/dto/loan-request/create-loan-request-dto';

@Injectable()
export class LoanRequestService {
  constructor(
    @InjectRepository(LoanRequest)
    private readonly loanRequestRepository: Repository<LoanRequest>,
  ) {}

  async createLoanRequest(data: CreateLoanRequestDto): Promise<LoanRequest> {
    const loanToBeSaved = { ...data };

    const loan = await this.loanRequestRepository.save(
      plainToInstance(Loan, loanToBeSaved),
    );

    return loan;
  }

  async getLoanRequestById(id: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestRepository.findOne({
      where: { id },
    });

    if (!loanRequest) {
      throw new Error('Loan not found');
    }

    return loanRequest;
  }

  async updateLoanRequest(
    data: CreateLoanRequestDto,
    id: string,
  ): Promise<LoanRequest> {
    const oldLoan = await this.loanRequestRepository.findOne({
      where: { id },
    });

    if (!oldLoan) {
      throw new Error('Loan not found');
    }

    const loan = await this.loanRequestRepository.findOne({
      where: { id },
    });

    return loan;
  }

  async deleteLoanRequest(id: string): Promise<void> {
    await this.loanRequestRepository.delete(id);
  }
}
