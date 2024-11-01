import { ConfigModule, ConfigType, registerAs } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DBAuthModule, DBClientModule, CommonModule } from '@tms/common';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';

export const TmsConfig = registerAs('TMS', () => ({
  SERVICE_CODE: process.env['SERVICE_CODE'],
  SERVICE_ID: process.env['SERVICE_ID'],
  SERVICE_KEY: process.env['SERVICE_KEY'],
}));

export type TTmsConfig = ConfigType<typeof TmsConfig>;

//#region base module
export const BaseModule = [
  CommonModule,
  DBClientModule,
  DBAuthModule,
  ClientsModule.register([
    {
      name: 'LOGGER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),
  ConfigModule.forRoot({
    cache: false,
    load: [TmsConfig],
    envFilePath: [`${process.cwd()}/apps/tms/.env`],
  }),
];
//#endregion

//#region api module
export const ApiModule = [ClientModule, UserModule];
//#endregion
