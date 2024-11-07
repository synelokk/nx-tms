import { forwardRef, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  CommonModule,
  DBClientModule,
  DBLogModule,
  DBProductModule,
  ErrorInterceptor,
} from '@tms/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';

@Module({
  imports: [
    CommonModule,
    DBLogModule,
    DBClientModule,
    DBProductModule,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
