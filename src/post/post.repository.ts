import { Injectable } from '@nestjs/common';
import { RequestContextService } from 'src/common/request.context';
import { TPrismaTransaction } from 'src/payment/payment.repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  get connection(): TPrismaTransaction {
    if (RequestContextService.getTransactionConnection()) {
      return RequestContextService.getTransactionConnection() as TPrismaTransaction;
    }

    return this.prisma;
  }

  async updateMany(title: string) {
    await this.connection.post.updateMany({
      where: {},
      data: {
        title: title,
      },
    });
  }

  async findMany() {
    return await this.prisma.post.findMany();
  }
}
