import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from '@tms/common';
import { WinstonModule } from 'nest-winston';
import { Logger, LoggerConfig } from '@tms/common';

async function bootstrap(): Promise<void> {
  const logger = new LoggerConfig('CENTRALIZE');
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(logger.getLoggerConfig()),
  });
  app.enableCors();
  app.setGlobalPrefix('centralize/api');
  app.enableVersioning();
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const loggerService = await app.resolve(Logger);
  app.useGlobalFilters(new NotFoundExceptionFilter(loggerService));
  await app.listen(3002);
}
bootstrap();
