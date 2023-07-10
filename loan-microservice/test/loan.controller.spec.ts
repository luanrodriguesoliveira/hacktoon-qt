import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from '../src/controller/loan.controller';
import { LoanService } from 'src/service/loan.service';
import { CreateLoanDto } from 'src/dto/loan/create-loan-dto';

describe('LoanController', () => {
  let loanController: LoanController;
  let loanService: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [
        {
          provide: LoanService,
          useValue: {
            createLoan: jest.fn().mockResolvedValue({}),
            getLoanById: jest.fn().mockResolvedValue({}),
            updateLoan: jest.fn().mockResolvedValue({}),
            deleteLoan: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    loanController = module.get<LoanController>(LoanController);
    loanService = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(loanController).toBeDefined();
  });

  it('should create a loan', async () => {
    const dto: CreateLoanDto = new CreateLoanDto();
    expect(await loanController.createLoan(dto)).toEqual(JSON.stringify({}));
  });

  it('should return a loan by id', async () => {
    const id = '1';
    expect(await loanController.getLoan(id)).toEqual(JSON.stringify({}));
  });

  it('should update a loan', async () => {
    const id = '1';
    const dto: CreateLoanDto = new CreateLoanDto();
    expect(await loanController.updateLoan(id, dto)).toEqual(
      JSON.stringify({}),
    );
  });

  it('should delete a loan', async () => {
    const id = '1';
    expect(await loanController.deleteLoan(id)).toEqual(
      `Loan with ID ${id} has been deleted`,
    );
  });
});
