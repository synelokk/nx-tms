import { ConfigModule, ConfigType, registerAs } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from '@tms/common';

export const AppConfig = registerAs('CENTRALIZE', () => ({
  SERVICE_CODE: process.env['SERVICE_CODE'],
  SERVICE_ID: process.env['SERVICE_ID'],
  SERVICE_KEY: process.env['SERVICE_KEY'],
}));

export type TAppConfig = ConfigType<typeof AppConfig>;

export const BaseModule = [
  CommonModule,
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
    load: [AppConfig],
    envFilePath: [`${process.cwd()}/apps/centralize/.env`],
  }),
];

export const ApiModule = [];
