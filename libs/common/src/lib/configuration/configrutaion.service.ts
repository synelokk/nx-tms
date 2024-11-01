import { Injectable } from '@nestjs/common';
import {
  ClientRoleRepository,
  ClientRepository,
  ClientRoleEntity,
  ClientEntity,
} from '../database/client';

@Injectable()
export class ConfigurationService {
  constructor(
    public readonly clientRepository: ClientRepository,
    public readonly clientRoleRepository: ClientRoleRepository
  ) {}

  public async getClientRolesByClientCode(
    clientCode: string
  ): Promise<ClientRoleEntity[]> {
    const client = (await this.clientRepository.findByWhere({
      clientCode,
    })) as ClientEntity;
    if (!client) {
      return [];
    }
    const clientRoles = (await this.clientRoleRepository.findByWhere({
      clientSid: client.clientSid,
    })) as ClientRoleEntity[];
    return clientRoles;
  }
}
