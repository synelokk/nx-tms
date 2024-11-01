import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { EventPattern } from '@tms/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('logger')
  public async createLogger(@Payload() data: any): Promise<void> {
    console.log(data);
    this.appService.create(data);
  }
}
