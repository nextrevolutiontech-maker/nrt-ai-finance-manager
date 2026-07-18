import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string) {
    return this.prisma.quotation.findMany({
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
    const quotation = await this.prisma.quotation.findUnique({ where: { id } });
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return quotation;
  }

  async create(data: {
    customer: string;
    amount: number;
    date: string;
    validUntil: string;
    status?: string;
  }) {
    const count = await this.prisma.quotation.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const year = new Date().getFullYear();
    const id = `QT-${year}-${nextNum}`;

    return this.prisma.quotation.create({
      data: {
        id,
        customer: data.customer,
        amount: Number(data.amount),
        date: data.date,
        validUntil: data.validUntil,
        status: data.status || 'draft',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id); // will throw NotFoundException if not found
    return this.prisma.quotation.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quotation.delete({ where: { id } });
  }
}
