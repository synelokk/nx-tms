import { Injectable } from '@nestjs/common';
import { Repository, ClientUserEntity } from '@tms/common';

@Injectable()
export class ClientUserRepository extends Repository<ClientUserEntity> {
  constructor() {
    super(ClientUserEntity);
  }
}
