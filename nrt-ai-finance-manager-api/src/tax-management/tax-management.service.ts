import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaxManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.taxRate.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const tax = await this.prisma.taxRate.findUnique({ where: { id } });
    if (!tax) {
      throw new NotFoundException(`Tax rate with ID ${id} not found`);
    }
    return tax;
  }

  async create(data: { name: string; rate: number; description: string }) {
    const count = await this.prisma.taxRate.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `TAX-${nextNum}`;

    return this.prisma.taxRate.create({
      data: {
        id,
        name: data.name,
        rate: Number(data.rate),
        description: data.description,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.taxRate.update({
      where: { id },
      data,
    });
  }

  async toggleStatus(id: string, isActive: boolean) {
    await this.findOne(id);
    return this.prisma.taxRate.update({
      where: { id },
      data: { isActive },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.taxRate.delete({ where: { id } });
  }
}
