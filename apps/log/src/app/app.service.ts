import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Service,
  ClientEntity,
  LogEntity,
  ClientRepository,
} from '@tms/common';
import { ConfigService } from '@nestjs/config';
import { DateNow } from '@tms/utils';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService extends Service<LogEntity> implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    public readonly logRepository: AppRepository,
    public readonly clientRepository: ClientRepository,
  ) {
    super(logRepository);
  }
  public onModuleInit(): void {
    this.configService.set('LOG.SERVICE_CODE', process.env['SERVICE_CODE']);
    this.configService.set('LOG.SERVICE_ID', process.env['SERVICE_ID']);
    this.configService.set('LOG.SERVICE_KEY', process.env['SERVICE_KEY']);
  }

  public async create(data: any): Promise<LogEntity> {
    const client: ClientEntity = (await this.clientRepository.findByWhere(
      {
        clientId: data.clientId,
      },
      {
        limit: 1,
      },
    )) as ClientEntity;

    data.clientSid = client.clientSid;
    data.serviceSid = client.clientSid;
    data.logCode = data.code;
    data.logDate = DateNow();
    return this.logRepository.create(data).catch((error) => {
      throw error;
    });
  }
}
