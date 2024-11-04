import { forwardRef, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  CommonModule,
  DBClientModule,
  DBLogModule,
  ErrorInterceptor,
} from '@tms/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { ClientModule } from './client/client.module';
import { ClientRepository } from './client/client.repository';
import { ClientService } from './client/client.service';

@Module({
  imports: [
    CommonModule,
    DBLogModule,
    DBClientModule,
    forwardRef(() => ClientModule),
    ConfigModule.forRoot({
      cache: false,
      load: [AppConfig],
      envFilePath: [`${process.cwd()}/apps/log/.env`],
    }),
  ],
  controllers: [AppController],
  exports: [AppService, AppRepository],
  providers: [
    AppService,
    AppRepository,
    ClientRepository,
    ClientService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
