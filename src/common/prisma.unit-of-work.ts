import { RequestContextService } from './request.context';
import { PrismaService } from '../prisma.service';
import { UnitOfWork } from './unitOfWork';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  async transaction<T>(fn: () => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async (tx) => {
      RequestContextService.setTransactionConnection(tx);

      const t = await fn();

      RequestContextService.cleanTransactionConnection();

      return t;
    });
  }
}
