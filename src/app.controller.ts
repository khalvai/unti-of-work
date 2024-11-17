import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async agetHello(): Promise<string> {
    return await this.appService.resell();
  }

  @Get('result')
  async get() {
    return this.appService.result();
  }
}
