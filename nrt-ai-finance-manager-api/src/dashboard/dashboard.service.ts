import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData() {
    // Bring data from multiple tables to show on the main Dashboard
    const [
      totalInvoices,
      totalCustomers,
      totalSuppliers,
      expensesSum,
      incomeSum,
      recentInvoices,
      unreadNotifications
    ] = await Promise.all([
      this.prisma.invoice.count(),
      this.prisma.customer.count(),
      this.prisma.supplier.count(),
      this.prisma.expense.aggregate({ _sum: { amount: true } }),
      this.prisma.income.aggregate({ _sum: { amount: true } }),
      this.prisma.invoice.findMany({ take: 5, orderBy: { date: 'desc' } }),
      this.prisma.notification.count({ where: { isRead: false } }),
    ]);

    return {
      overview: {
        totalInvoices,
        totalCustomers,
        totalSuppliers,
        totalExpenses: expensesSum._sum.amount || 0,
        totalIncome: incomeSum._sum.amount || 0,
        netBalance: (incomeSum._sum.amount || 0) - (expensesSum._sum.amount || 0),
        unreadNotifications,
      },
      recentActivity: {
        recentInvoices,
      }
    };
  }
}
