import { Injectable } from '@nestjs/common';
import { ClientService as BaseClientService } from '../client.service';

@Injectable()
export class ClientService extends BaseClientService {
  public storedProcedure(
    spName: string,
    parameter: Record<string, any>,
  ): Promise<any> {
    return this.clientRepository
      .storedProcedure(spName, parameter)
      .catch((error) => {
        throw error;
      });
  }
}
