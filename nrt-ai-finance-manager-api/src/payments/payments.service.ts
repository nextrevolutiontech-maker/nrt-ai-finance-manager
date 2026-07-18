import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string) {
    return this.prisma.payment.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status } : {},
          search
            ? {
                OR: [
                  { payee: { contains: search, mode: 'insensitive' } },
                  { id: { contains: search, mode: 'insensitive' } },
                  { reference: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async create(data: {
    payee: string;
    amount: number;
    date: string;
    method: string;
    reference: string;
    status?: string;
  }) {
    const count = await this.prisma.payment.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const year = new Date().getFullYear();
    const id = `PAY-${year}-${nextNum}`;

    return this.prisma.payment.create({
      data: {
        id,
        payee: data.payee,
        amount: Number(data.amount),
        date: data.date,
        method: data.method,
        reference: data.reference,
        status: data.status || 'completed',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id); // will throw NotFoundException if not found
    return this.prisma.payment.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.payment.delete({ where: { id } });
  }
}
