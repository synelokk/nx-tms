import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import {
  // ValidationPipe,
  Logger,
  LoggerConfig,
} from '@tms/common';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { Logger as NestLogger } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ForbiddenExceptionFilter } from '@tms/common';

async function bootstrap(): Promise<void> {
  const logger = new LoggerConfig('TMS');
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(logger.getLoggerConfig()),
  });
  const globalPrefix = 'tms/api';
  const port = process.env['PORT'] || 3000;
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning();
  app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe());
  const loggerService = await app.resolve(Logger);
  app.useGlobalFilters(
    // new NotFoundExceptionFilter(loggerService),
    new ForbiddenExceptionFilter(loggerService),
  );

  // const config = new DocumentBuilder()
  //   .setTitle('TMS')
  //   .setDescription('The TMS API description')
  //   .setVersion('1.0')
  //   .addTag('tms')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);

  await app.listen(port);

  NestLogger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );

  const timeZone = app.get(ConfigService).get('TIMEZONE');
  process.env['TZ'] = timeZone;
}
bootstrap();
