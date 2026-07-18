import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CashFlowService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(startDate?: string, endDate?: string) {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const incomeWhere = Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {};
    const expenseWhere = Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {};

    const incomeRecords = await this.prisma.income.findMany({ where: incomeWhere });
    const expenseRecords = await this.prisma.expense.findMany({ where: expenseWhere });

    const totalInflow = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    const totalOutflow = expenseRecords.reduce((sum, record) => sum + record.amount, 0);

    return {
      totalInflow,
      totalOutflow,
      netCashFlow: totalInflow - totalOutflow,
      inflowCount: incomeRecords.length,
      outflowCount: expenseRecords.length,
    };
  }
}
