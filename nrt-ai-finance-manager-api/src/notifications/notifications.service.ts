import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(isRead?: boolean) {
    const where = isRead !== undefined ? { isRead } : {};
    return this.prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async create(data: { title: string; message: string; type: string }) {
    const count = await this.prisma.notification.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `NOTIF-${nextNum}`;

    return this.prisma.notification.create({
      data: {
        id,
        title: data.title,
        message: data.message,
        type: data.type,
      },
    });
  }

  async markAsRead(id: string) {
    await this.findOne(id);
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead() {
    return this.prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.notification.delete({ where: { id } });
  }
}
