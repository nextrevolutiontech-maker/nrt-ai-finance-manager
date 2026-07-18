import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinancialReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardSummary() {
    const [invoices, expenses, income, payments] = await Promise.all([
      this.prisma.invoice.findMany(),
      this.prisma.expense.findMany(),
      this.prisma.income.findMany(),
      this.prisma.payment.findMany(),
    ]);

    const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const unpaidInvoices = invoices
      .filter((inv) => inv.status === 'pending')
      .reduce((sum, inv) => sum + inv.amount, 0);

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const unpaidExpenses = expenses
      .filter((exp) => exp.status === 'pending')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
    const totalPayments = payments.reduce((sum, pay) => sum + pay.amount, 0);

    return {
      summary: {
        totalInvoiced,
        unpaidInvoices,
        totalExpenses,
        unpaidExpenses,
        totalIncome,
        totalPayments,
        netCashFlow: totalIncome - totalExpenses,
      },
      reportsGeneratedAt: new Date().toISOString(),
    };
  }
}
