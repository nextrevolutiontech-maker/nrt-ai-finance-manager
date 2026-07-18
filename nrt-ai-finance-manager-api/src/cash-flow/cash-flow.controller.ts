import { Controller, Get, Query } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private readonly cashFlowService: CashFlowService) {}

  @Get()
  getSummary(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.cashFlowService.getSummary(startDate, endDate);
  }
}
