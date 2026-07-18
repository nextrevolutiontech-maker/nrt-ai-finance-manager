import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string) {
    return this.prisma.expense.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status } : {},
          search
            ? {
                OR: [
                  { vendor: { contains: search, mode: 'insensitive' } },
                  { category: { contains: search, mode: 'insensitive' } },
                  { id: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async create(data: {
    category: string;
    amount: number;
    date: string;
    vendor: string;
    description: string;
    status?: string;
  }) {
    const count = await this.prisma.expense.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const year = new Date().getFullYear();
    const id = `EXP-${year}-${nextNum}`;

    return this.prisma.expense.create({
      data: {
        id,
        category: data.category,
        amount: Number(data.amount),
        date: data.date,
        vendor: data.vendor,
        description: data.description,
        status: data.status || 'paid',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id); // will throw NotFoundException if not found
    return this.prisma.expense.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}
