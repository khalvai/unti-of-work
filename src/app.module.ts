import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RequestContextModule } from 'nestjs-request-context';
import { PaymentRepository } from './payment/payment.repository';
import { PostRepository } from './post/post.repository';
import { PrismaUnitOfWork } from './common/prisma.unit-of-work';
import { UnitOfWork } from './common/unitOfWork';

@Module({
  imports: [RequestContextModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    PaymentRepository,
    PostRepository,
    PrismaUnitOfWork,
    {
      provide: UnitOfWork,
      useClass: PrismaUnitOfWork,
    },
  ],
})
export class AppModule {}
