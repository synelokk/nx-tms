import { Controller, Get, Scope } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller({
  path: 'client',
  version: '2',
  scope: Scope.REQUEST,
  durable: true,
})
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  public findAll(): Promise<any> {
    return this.clientService.findAll();
  }
}
