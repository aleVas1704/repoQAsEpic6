import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../prisma/client.js';
import { buildDatabaseConnectionString } from './build-connection-string.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy
{
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: buildDatabaseConnectionString('runtime'),
        max: 3,
        connectionTimeoutMillis: 10_000,
        idleTimeoutMillis: 30_000,
      }),
    });
  }


  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
