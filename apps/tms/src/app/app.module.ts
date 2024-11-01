import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestMiddleware } from '@tms/common';
import { ResponseInterceptor, ErrorInterceptor } from '@tms/common';
import { ApiModule, BaseModule } from './app.config';
import { AppService } from './app.service';

@Module({
  imports: [...BaseModule, ...ApiModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
