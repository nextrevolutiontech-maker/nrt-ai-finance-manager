import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerLedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(customerId?: string) {
    return this.prisma.customerLedger.findMany({
      where: customerId ? { customerId } : {},
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const entry = await this.prisma.customerLedger.findUnique({ where: { id } });
    if (!entry) {
      throw new NotFoundException(`Ledger entry with ID ${id} not found`);
    }
    return entry;
  }

  async create(data: {
    customerId: string;
    date: string;
    description: string;
    type: string;
    debit: number;
    credit: number;
    balance: number;
  }) {
    const count = await this.prisma.customerLedger.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `CL-${nextNum}`;

    return this.prisma.customerLedger.create({
      data: {
        id,
        customerId: data.customerId,
        date: data.date,
        description: data.description,
        type: data.type,
        debit: Number(data.debit),
        credit: Number(data.credit),
        balance: Number(data.balance),
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.customerLedger.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.customerLedger.delete({ where: { id } });
  }
}
