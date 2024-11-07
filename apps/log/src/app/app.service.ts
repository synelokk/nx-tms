import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Service,
  ClientEntity,
  LogEntity,
  ServiceEntity,
  ClientRepository,
  ServiceRepository,
} from '@tms/common';
import { ConfigService } from '@nestjs/config';
import { DateNow } from '@tms/utils';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService extends Service<LogEntity> implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    public readonly appRepository: AppRepository,
    public readonly clientRepository: ClientRepository,
    public readonly serviceRepository: ServiceRepository,
  ) {
    super(appRepository);
  }
  public onModuleInit(): void {
    this.configService.set('LOG.SERVICE_CODE', process.env['SERVICE_CODE']);
    this.configService.set('LOG.SERVICE_ID', process.env['SERVICE_ID']);
    this.configService.set('LOG.SERVICE_KEY', process.env['SERVICE_KEY']);
  }

  public override async create(data: any): Promise<LogEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      clientId: data.clientId,
    });

    const service: ServiceEntity = await this.serviceRepository.findOne({
      serviceId: data.serviceId,
    });

    data.clientSid = client.clientSid;
    data.serviceSid = service.serviceSid;
    data.logCode = data.code;
    data.logDate = DateNow();
    return this.appRepository.create(data).catch((error) => {
      throw error;
    });
  }
}
