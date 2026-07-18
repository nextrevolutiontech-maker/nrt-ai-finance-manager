import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string) {
    return this.prisma.invoice.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status } : {},
          search
            ? {
                OR: [
                  { customer: { contains: search, mode: 'insensitive' } },
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
    const invoice = await this.prisma.invoice.findUnique({ where: { id } });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async create(data: {
    customer: string;
    amount: number;
    date: string;
    due: string;
    status?: string;
  }) {
    const count = await this.prisma.invoice.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const year = new Date().getFullYear();
    const id = `INV-${year}-${nextNum}`;

    return this.prisma.invoice.create({
      data: {
        id,
        customer: data.customer,
        amount: Number(data.amount),
        date: data.date,
        due: data.due,
        status: data.status || 'pending',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id); // will throw NotFoundException if not found
    return this.prisma.invoice.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.invoice.delete({ where: { id } });
  }
}
