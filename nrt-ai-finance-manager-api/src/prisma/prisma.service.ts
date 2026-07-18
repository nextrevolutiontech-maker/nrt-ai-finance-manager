import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeonHttp } from '@prisma/adapter-neon';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaNeonHttp(
      process.env.DATABASE_URL!,
      {} as any,
    );
    super({ adapter } as any);
  }
}
