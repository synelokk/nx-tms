import { Injectable } from '@nestjs/common';
import { ClientRoleEntity } from '../..';
import { Repository } from '../../../repository';

@Injectable()
export class ClientRoleRepository extends Repository<ClientRoleEntity> {
  constructor() {
    super(ClientRoleEntity);
  }
}
