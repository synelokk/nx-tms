import { Injectable } from '@nestjs/common';
import { ClientEntity } from '../entity';
import { Repository } from '../../../repository';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
  constructor() {
    super(ClientEntity);
  }
}
