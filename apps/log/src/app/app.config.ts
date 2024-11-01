import { ConfigType, registerAs } from '@nestjs/config';

export const AppConfig = registerAs('LOG', () => ({
  SERVICE_CODE: process.env['SERVICE_CODE'],
  SERVICE_ID: process.env['SERVICE_ID'],
  SERVICE_KEY: process.env['SERVICE_KEY'],
}));

export type TAppConfig = ConfigType<typeof AppConfig>;
