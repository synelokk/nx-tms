import { Injectable } from '@nestjs/common';
import { Repository, ClientEntity } from '@tms/common';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
  constructor() {
    super(ClientEntity);
  }
}
