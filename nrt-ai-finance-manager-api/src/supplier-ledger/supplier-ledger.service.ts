import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierLedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(supplierId?: string) {
    return this.prisma.supplierLedger.findMany({
      where: supplierId ? { supplierId } : {},
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const entry = await this.prisma.supplierLedger.findUnique({ where: { id } });
    if (!entry) {
      throw new NotFoundException(`Ledger entry with ID ${id} not found`);
    }
    return entry;
  }

  async create(data: {
    supplierId: string;
    date: string;
    description: string;
    type: string;
    debit: number;
    credit: number;
    balance: number;
  }) {
    const count = await this.prisma.supplierLedger.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `SL-${nextNum}`;

    return this.prisma.supplierLedger.create({
      data: {
        id,
        supplierId: data.supplierId,
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
    return this.prisma.supplierLedger.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.supplierLedger.delete({ where: { id } });
  }
}
