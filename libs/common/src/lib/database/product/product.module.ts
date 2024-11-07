import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DB_PRODUCT } from '../../configuration';
import { ServiceConfigurationEntity, ServiceEntity } from './entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          load: [DB_PRODUCT],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mssql',
        host: configService.get('DB_PRODUCT.HOST'),
        port: configService.get('DB_PRODUCT.PORT'),
        username: configService.get('DB_PRODUCT.USER'),
        password: configService.get('DB_PRODUCT.PASSWORD'),
        database: configService.get('DB_PRODUCT.NAME'),
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        },
        models: [ServiceEntity, ServiceConfigurationEntity],
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBProductModule {}
