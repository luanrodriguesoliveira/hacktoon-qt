import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateLoanDto } from '../dto/loan/create-loan-dto';
import { LoanService } from '../service/loan.service';

@Controller('loans')
export class LoanController {
  constructor(@Inject(LoanService) private loanService: LoanService) {}

  @Post()
  async createLoan(@Body() body: CreateLoanDto): Promise<string> {
    try {
      const loan = await this.loanService.createLoan(body);
      return JSON.stringify(loan);
    } catch (error) {
      throw new HttpException(
        'Error creating the loan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getLoan(@Param('id') id: string): Promise<string> {
    try {
      const loan = await this.loanService.getLoanById(id);
      return JSON.stringify(loan);
    } catch (error) {
      throw new HttpException(
        'Error getting the loan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateLoan(
    @Param('id') id: string,
    @Body() body: CreateLoanDto,
  ): Promise<string> {
    try {
      const loan = await this.loanService.updateLoan(body, id);
      return JSON.stringify(loan);
    } catch (error) {
      throw new HttpException(
        'Error updating the loan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteLoan(@Param('id') id: string): Promise<string> {
    try {
      await this.loanService.deleteLoan(id);
      return `Loan with ID ${id} has been deleted`;
    } catch (error) {
      throw new HttpException(
        'Error deleting the loan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
