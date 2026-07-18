import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfitLossService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatement(startDate?: string, endDate?: string) {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const where = Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {};

    const incomeRecords = await this.prisma.income.findMany({ where });
    const expenseRecords = await this.prisma.expense.findMany({ where });

    const totalRevenue = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      isProfit: netProfit >= 0,
      period: {
        startDate: startDate || 'All Time',
        endDate: endDate || 'All Time',
      },
    };
  }
}
