import { RequestContext } from 'nestjs-request-context';

/**
 * Setting some isolated context for each request.
 */

export class AppRequestContext extends RequestContext {
  user?: { id?: string };
  requestId?: string;
  transactionConnection?: any; // For global transactions
}

export class RequestContextService {
  static getContext(): AppRequestContext | undefined {
    const ctx: AppRequestContext = RequestContext.currentContext?.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();

    if (ctx) {
      ctx.requestId = id;
    }
  }

  static getRequestId(): string | undefined {
    return this.getContext()?.requestId;
  }

  static getUserId(): string | undefined {
    return this.getContext()?.user?.id;
  }

  static getTransactionConnection(): any | undefined {
    const ctx = this.getContext();
    return ctx?.transactionConnection;
  }

  static setTransactionConnection(transactionConnection?: any): void {
    const ctx = this.getContext();

    if (ctx) {
      ctx.transactionConnection = transactionConnection;
    }
  }

  static cleanTransactionConnection(): void {
    const ctx = this.getContext();

    if (ctx) {
      ctx.transactionConnection = undefined;
    }
  }
}
