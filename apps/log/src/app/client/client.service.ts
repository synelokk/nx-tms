import { Injectable } from '@nestjs/common';
import { Service, ClientEntity as C } from '@tms/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService extends Service<C> {
  constructor(public readonly clientRepository: ClientRepository) {
    super(clientRepository);
  }

  public async findByClientId(clientId: string): Promise<C> {
    const client = await this.findByWhere(
      {
        clientId: clientId,
      },
      {
        limit: 1,
      },
    );

    return client as C;
  }
}
