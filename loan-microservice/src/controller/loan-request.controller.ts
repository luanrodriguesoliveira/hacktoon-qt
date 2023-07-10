import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateLoanRequestDto } from 'src/dto/loan-request/create-loan-request-dto';
import { LoanRequestService } from 'src/service/loan-request.service';

@Controller('loan-requests')
export class LoanRequestController {
  constructor(private loanRequestService: LoanRequestService) {}

  @Post()
  async createLoanRequest(@Body() body: CreateLoanRequestDto): Promise<string> {
    try {
      const loanRequest = await this.loanRequestService.createLoanRequest(body);
      return JSON.stringify(loanRequest);
    } catch (error) {
      throw new HttpException(
        'Error creating the loan request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getLoanRequest(@Param('id') id: string): Promise<string> {
    try {
      const loanRequest = await this.loanRequestService.getLoanRequestById(id);
      return JSON.stringify(loanRequest);
    } catch (error) {
      throw new HttpException(
        'Error getting the loan request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateLoanRequest(
    @Param('id') id: string,
    @Body() body: CreateLoanRequestDto,
  ): Promise<string> {
    try {
      const loanRequest = await this.loanRequestService.updateLoanRequest(
        body,
        id,
      );
      return JSON.stringify(loanRequest);
    } catch (error) {
      throw new HttpException(
        'Error updating the loan request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteLoanRequest(@Param('id') id: string): Promise<string> {
    try {
      await this.loanRequestService.deleteLoanRequest(id);
      return `Loan request with ID ${id} has been deleted`;
    } catch (error) {
      throw new HttpException(
        'Error deleting the loan request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
