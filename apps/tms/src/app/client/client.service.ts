import { Injectable } from '@nestjs/common';
import { Service, ClientEntity } from '@tms/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService extends Service<ClientEntity> {
  constructor(public readonly clientRepository: ClientRepository) {
    super(clientRepository);
  }
}
