import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment/payment.repository';
import { PostRepository } from './post/post.repository';
import { UnitOfWork } from './common/unitOfWork';

@Injectable()
export class AppService {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly paymentRepository: PaymentRepository,
    private readonly postRepository: PostRepository,
  ) {}
  async resell(): Promise<any> {
    await this.unitOfWork.transaction(async () => {
      await this.paymentRepository.create();

      await this.postRepository.updateMany('SAJJAD_MRX');
    });
  }

  async result() {
    const posts = await this.postRepository.findMany();
    const payments = await this.paymentRepository.findMany();
    return {
      posts,
      payments,
    };
  }
}
