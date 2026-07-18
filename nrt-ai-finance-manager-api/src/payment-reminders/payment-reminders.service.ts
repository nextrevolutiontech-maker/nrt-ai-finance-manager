import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentRemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string) {
    return this.prisma.paymentReminder.findMany({
      where: status ? { status } : {},
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const reminder = await this.prisma.paymentReminder.findUnique({ where: { id } });
    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }
    return reminder;
  }

  async create(data: {
    invoiceId: string;
    customerId: string;
    date: string;
    message: string;
    status?: string;
  }) {
    const count = await this.prisma.paymentReminder.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `REM-${nextNum}`;

    return this.prisma.paymentReminder.create({
      data: {
        id,
        invoiceId: data.invoiceId,
        customerId: data.customerId,
        date: data.date,
        message: data.message,
        status: data.status || 'pending',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id);
    return this.prisma.paymentReminder.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.paymentReminder.delete({ where: { id } });
  }
}
