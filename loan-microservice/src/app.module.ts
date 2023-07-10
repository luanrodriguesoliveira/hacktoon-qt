import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Loan } from './entity/loan.entity';
import { LoanRequest } from './entity/loan-request.entity';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { LoanController } from './controller/loan.controller';
import { LoanService } from './service/loan.service';
import { LoanRequestController } from './controller/loan-request.controller';
import { LoanRequestService } from './service/loan-request.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Loan, LoanRequest, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Loan, LoanRequest, User]),
  ],
  controllers: [UserController, LoanController, LoanRequestController],
  providers: [UserService, LoanService, LoanRequestService],
})
export class AppModule {}
