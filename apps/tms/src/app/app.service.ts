import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ServiceConfigurationEntity,
  ServiceConfigurationRepository,
} from '@tms/common';
import path from 'node:path';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly serviceConfigurationRepository: ServiceConfigurationRepository,
  ) {}
  public async onModuleInit(): Promise<void> {
    this.configService.set('TMS.SERVICE_CODE', process.env['SERVICE_CODE']);
    this.configService.set('TMS.SERVICE_ID', process.env['SERVICE_ID']);
    this.configService.set('TMS.SERVICE_KEY', process.env['SERVICE_KEY']);

    const serviceConfig =
      (await this.serviceConfigurationRepository.findByWhere({
        serviceSid: 'D33541AA-26EA-4692-B53C-E6B624EDE409',
      })) as ServiceConfigurationEntity[];

    serviceConfig.forEach((config) => {
      this.configService.set(
        `TMS.${config.configurationKey}`,
        config.configurationValue,
      );
    });

    // const rbac = path.join(
    //   __dirname,
    //   '..',
    //   '..',
    //   '..',
    //   'apps',
    //   'tms',
    //   'rbac.conf',
    // );
    // console.log(rbac);
    // this.configService.set('CONFIG_RBAC', rbac);
  }
}
