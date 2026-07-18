import { Controller, Get } from '@nestjs/common';
import { FinancialReportsService } from './financial-reports.service';

@Controller('financial-reports')
export class FinancialReportsController {
  constructor(private readonly reportsService: FinancialReportsService) {}

  @Get('summary')
  getDashboardSummary() {
    return this.reportsService.getDashboardSummary();
  }
}
