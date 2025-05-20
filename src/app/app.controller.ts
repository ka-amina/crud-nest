import { Controller, Get } from '@nestjs/common';
import { BaseController } from '@opentecc/nestjs-core';
import { AppService } from './app.service';

@Controller('users')
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
