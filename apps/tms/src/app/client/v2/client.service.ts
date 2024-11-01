import { Injectable } from '@nestjs/common';
import { ClientService as BaseClientService } from '../client.service';

@Injectable()
export class ClientService extends BaseClientService {
  public async findAll(): Promise<any> {
    return [];
  }
}
