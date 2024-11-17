import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Decimal, DefaultArgs } from '@prisma/client/runtime/library';
import { RequestContextService } from 'src/common/request.context';
import { PrismaService } from 'src/prisma.service';

export type TPrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get connection(): TPrismaTransaction {
    if (RequestContextService.getTransactionConnection()) {
      return RequestContextService.getTransactionConnection() as TPrismaTransaction;
    }

    return this.prisma;
  }

  async create() {
    await this.connection.payment.create({
      data: {
        amount: new Decimal(1000000),
      },
    });
  }

  async findMany() {
    return this.prisma.payment.findMany();
  }
}
