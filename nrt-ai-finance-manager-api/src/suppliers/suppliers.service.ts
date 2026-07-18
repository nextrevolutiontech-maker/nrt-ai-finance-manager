import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, search?: string) {
    return this.prisma.supplier.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status } : {},
          search
            ? {
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { email: { contains: search, mode: 'insensitive' } },
                  { company: { contains: search, mode: 'insensitive' } },
                  { id: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async create(data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    status?: string;
  }) {
    const count = await this.prisma.supplier.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `SUPP-${nextNum}`;

    return this.prisma.supplier.create({
      data: {
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        company: data.company,
        status: data.status || 'active',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id); // will throw NotFoundException if not found
    return this.prisma.supplier.update({
      where: { id },
      data: { status },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.supplier.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.supplier.delete({ where: { id } });
  }
}
