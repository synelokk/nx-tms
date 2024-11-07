import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  InvalidCredentialsException,
  ServiceConfigurationEntity,
  ServiceConfigurationRepository,
  ServiceRepository,
} from '@tms/common';
import path from 'node:path';
import { Op } from 'sequelize';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly serviceRepository: ServiceRepository,
    private readonly serviceConfigurationRepository: ServiceConfigurationRepository,
  ) {}
  public async onModuleInit(): Promise<void> {
    this.configService.set('TMS.SERVICE_CODE', process.env['SERVICE_CODE']);
    this.configService.set('TMS.SERVICE_ID', process.env['SERVICE_ID']);
    this.configService.set('TMS.SERVICE_KEY', process.env['SERVICE_KEY']);

    const service = await this.serviceRepository.findOne({
      [Op.and]: {
        serviceCode: process.env['SERVICE_CODE'],
        serviceId: process.env['SERVICE_ID'],
        serviceKey: process.env['SERVICE_KEY'],
      },
    });

    if (!service) {
      throw new InvalidCredentialsException('Service not registered');
    }

    const serviceConfig =
      (await this.serviceConfigurationRepository.findByWhere({
        serviceSid: service.serviceSid,
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
