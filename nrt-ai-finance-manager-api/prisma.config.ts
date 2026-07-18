import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrate: {
    async adapter(env) {
      const { neon } = await import('@neondatabase/serverless');
      const { PrismaNeonHttp } = await import('@prisma/adapter-neon');
      const sql = neon(env.DATABASE_URL!);
      return new PrismaNeonHttp(sql);
    },
  },
});
