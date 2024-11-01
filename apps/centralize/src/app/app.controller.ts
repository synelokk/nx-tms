import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  public getHello(): string {
    for (let i = 0; i < 1000000; i++) {
      console.log(i);
    }
    return this.appService.getHello();
  }
}
