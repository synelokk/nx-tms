import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger as NestLogger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from '@tms/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const logger = new LoggerConfig('LOG');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
        retryAttempts: 3,
        retryDelay: 3000,
      },
      logger: WinstonModule.createLogger(logger.getLoggerConfig()),
    },
  );
  await app.listen();

  const timeZone = app.get(ConfigService).get('TIMEZONE');
  process.env.TZ = timeZone;

  NestLogger.log('🚀 Log microservice is listening');
}
bootstrap();
