import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string) {
    return this.prisma.income.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status } : {},
          search
            ? {
                OR: [
                  { source: { contains: search, mode: 'insensitive' } },
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
    const income = await this.prisma.income.findUnique({ where: { id } });
    if (!income) {
      throw new NotFoundException(`Income with ID ${id} not found`);
    }
    return income;
  }

  async create(data: {
    source: string;
    amount: number;
    date: string;
    description: string;
    status?: string;
  }) {
    const count = await this.prisma.income.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const year = new Date().getFullYear();
    const id = `INC-${year}-${nextNum}`;

    return this.prisma.income.create({
      data: {
        id,
        source: data.source,
        amount: Number(data.amount),
        date: data.date,
        description: data.description,
        status: data.status || 'received',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id); // will throw NotFoundException if not found
    return this.prisma.income.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.income.delete({ where: { id } });
  }
}
