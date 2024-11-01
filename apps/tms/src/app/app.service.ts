import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  public async onModuleInit(): Promise<void> {
    this.configService.set('TMS.SERVICE_CODE', process.env['SERVICE_CODE']);
    this.configService.set('TMS.SERVICE_ID', process.env['SERVICE_ID']);
    this.configService.set('TMS.SERVICE_KEY', process.env['SERVICE_KEY']);

    console.log(this.configService.get('TMS.SERVICE_CODE'));

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
