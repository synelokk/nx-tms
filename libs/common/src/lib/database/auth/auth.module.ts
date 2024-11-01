import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';
import { DB_AUTH } from '../../configuration';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          load: [DB_AUTH],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mssql',
        host: configService.get('DB_AUTH.HOST'),
        port: configService.get('DB_AUTH.PORT'),
        username: configService.get('DB_AUTH.USER'),
        password: configService.get('DB_AUTH.PASSWORD'),
        database: configService.get('DB_AUTH.NAME'),
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        },
        models: [User],
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBAuthModule {}
