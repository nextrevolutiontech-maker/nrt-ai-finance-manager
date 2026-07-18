import { Controller, Get, Query } from '@nestjs/common';
import { ProfitLossService } from './profit-loss.service';

@Controller('profit-loss')
export class ProfitLossController {
  constructor(private readonly profitLossService: ProfitLossService) {}

  @Get()
  getStatement(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.profitLossService.getStatement(startDate, endDate);
  }
}
