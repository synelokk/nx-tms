import { Injectable } from '@nestjs/common';
import { ClientUserEntity } from '../entity';
import { Repository } from '../../../repository';

@Injectable()
export class ClientUserRepository extends Repository<ClientUserEntity> {
  constructor() {
    super(ClientUserEntity);
  }
}
