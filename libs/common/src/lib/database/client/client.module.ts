import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientEntity, ClientRoleEntity, ClientUserEntity } from './entity';
import { DB_CLIENT } from '../../configuration';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          load: [DB_CLIENT],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mssql',
        host: configService.get('DB_CLIENT.HOST'),
        port: configService.get('DB_CLIENT.PORT'),
        username: configService.get('DB_CLIENT.USER'),
        password: configService.get('DB_CLIENT.PASSWORD'),
        database: configService.get('DB_CLIENT.NAME'),
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        },
        models: [ClientEntity, ClientRoleEntity, ClientUserEntity],
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBClientModule {}
