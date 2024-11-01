import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from './entity/log.entity';
import { DB_LOG } from '../../configuration';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          load: [DB_LOG],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mssql',
        host: configService.get('DB_LOG.HOST'),
        port: configService.get('DB_LOG.PORT'),
        username: configService.get('DB_LOG.USER'),
        password: configService.get('DB_LOG.PASSWORD'),
        database: configService.get('DB_LOG.NAME'),
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        },
        models: [Log],
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBLogModule {}
