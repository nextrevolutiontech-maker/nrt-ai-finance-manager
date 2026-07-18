import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const settings = await this.prisma.setting.findMany();
    // Convert to a simple key-value object
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
  }

  async findOne(key: string) {
    const setting = await this.prisma.setting.findUnique({ where: { key } });
    if (!setting) {
      throw new NotFoundException(`Setting with key '${key}' not found`);
    }
    return setting;
  }

  async upsert(key: string, value: string) {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }

  async upsertMultiple(settings: Record<string, string>) {
    const promises = Object.keys(settings).map((key) =>
      this.upsert(key, settings[key]),
    );
    await Promise.all(promises);
    return this.findAll();
  }
}
