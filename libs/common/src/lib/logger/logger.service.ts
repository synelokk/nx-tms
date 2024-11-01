import {
  Inject,
  Injectable,
  Logger as NestLogger,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INQUIRER } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AggregateError } from 'sequelize';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
  /**
   * @private
   * @property {NestLogger} logger - An instance of the Logger class used for logging messages.
   */
  private readonly logger: NestLogger;

  /**
   * Constructs an instance of LoggerService.
   *
   * @param parentClass - The parent class object injected by the INQUIRER token.
   * @param client - The client proxy injected by the LOGGER_SERVICE token.
   * @param configService - The configuration service instance.
   */
  constructor(
    @Inject(INQUIRER) private parentClass: object,
    @Inject('LOGGER_SERVICE') private readonly client: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    this.logger = new NestLogger(this.parentClass.constructor.name);
  }

  /**
   * Logs a message with a given request ID and emits the log event to a client.
   *
   * @param xRequestId - The unique request ID associated with the log entry.
   * @param message - The message to be logged.
   * @returns A promise that resolves when the log event has been emitted.
   *
   * @remarks
   * This method logs the message using the internal logger and then emits the log event
   * to a client. If the emission fails, it catches the error and logs the error message
   * and stack trace.
   *
   * @throws {AggregateError} If the emission of the log event fails, the error is caught
   * and logged. If the error contains multiple errors, the first error's message and stack
   * trace are logged.
   */
  public async log(xRequestId: string, message: string): Promise<void> {
    this.logger.log(`(${xRequestId}) ${message}`);
    await firstValueFrom(
      this.client.emit('logger', {
        logSid: xRequestId,
        type: 'info',
        clientId: this.configService.get('APP.CLIENT_ID'),
        serviceId: this.configService.get('SERVICE_ID'),
        message,
      }),
    ).catch((error: AggregateError) => {
      if (error.errors?.length > 0) {
        return this.logger.error(
          `${error.errors[0].message} ${message}`,
          error.errors[0].stack,
        );
      } else {
        return this.logger.error(`${error.message} ${message}`, error.stack);
      }
    });
  }

  /**
   * Logs a warning message and emits a logger event.
   *
   * @param xRequestId - The unique request identifier.
   * @param message - The warning message to log.
   * @param detail - Optional detailed information about the warning.
   * @returns A promise that resolves when the logging and event emission are complete.
   */
  public async warn(
    xRequestId: string,
    message: string,
    detail?: string,
  ): Promise<void> {
    this.logger.warn(`(${xRequestId}) ${message}`);
    await firstValueFrom(
      this.client.emit('logger', {
        logSid: xRequestId,
        type: 'info',
        clientId: this.configService.get('APP.CLIENT_ID'),
        serviceId: this.configService.get('SERVICE_ID'),
        message,
        detail,
      }),
    ).catch((error: AggregateError) => {
      if (error.errors?.length > 0) {
        return this.logger.error(
          `${error.errors[0].message} ${message}`,
          error.errors[0].stack,
        );
      } else {
        return this.logger.error(`${error.message} ${message}`, error.stack);
      }
    });
  }

  /**
   * Logs a debug message and emits a logger event.
   *
   * @param xRequestId - The unique request identifier.
   * @param message - The debug message to log.
   * @returns A promise that resolves when the logging and event emission are complete.
   *
   * @remarks
   * This method logs a debug message using the internal logger and emits a 'logger' event
   * with the provided message and additional metadata. If the event emission fails, it logs
   * the error message and stack trace.
   */
  public async debug(xRequestId: string, message: string): Promise<void> {
    this.logger.debug(`(${xRequestId}) ${message}`);
    await firstValueFrom(
      this.client.emit('logger', {
        logSid: xRequestId,
        type: 'info',
        clientId: this.configService.get('APP.CLIENT_ID'),
        serviceId: this.configService.get('SERVICE_ID'),
        message,
      }),
    ).catch((error: AggregateError) => {
      if (error.errors?.length > 0) {
        return this.logger.error(
          `${error.errors[0].message} ${message}`,
          error.errors[0].stack,
        );
      } else {
        return this.logger.error(`${error.message} ${message}`, error.stack);
      }
    });
  }

  /**
   * Logs a verbose message and emits a logger event.
   *
   * @param xRequestId - The unique request identifier.
   * @param message - The message to log.
   * @returns A promise that resolves when the logging is complete.
   *
   * @remarks
   * This method logs a verbose message using the internal logger and emits a logger event
   * to an external client. If the event emission fails, it catches the error and logs it
   * using the internal logger.
   */
  public async verbose(xRequestId: string, message: string): Promise<void> {
    this.logger.verbose(`(${xRequestId}) ${message}`);
    await firstValueFrom(
      this.client.emit('logger', {
        logSid: xRequestId,
        type: 'info',
        clientId: this.configService.get('APP.CLIENT_ID'),
        serviceId: this.configService.get('SERVICE_ID'),
        message,
      }),
    ).catch((error: AggregateError) => {
      if (error.errors?.length > 0) {
        return this.logger.error(
          `${error.errors[0].message} ${message}`,
          error.errors[0].stack,
        );
      } else {
        return this.logger.error(`${error.message} ${message}`, error.stack);
      }
    });
  }

  /**
   * Logs an informational message and emits it to a remote logging service.
   *
   * @param xRequestId - The unique request identifier.
   * @param message - The message to log.
   * @returns A promise that resolves when the log has been emitted.
   *
   * @remarks
   * This method logs the message locally using the logger service and then emits the log to a remote logging service.
   * If the emission fails, it catches the error and logs the error message and stack trace.
   *
   * @throws {AggregateError} If the emission to the remote logging service fails.
   */
  public async info(xRequestId: string, message: string): Promise<void> {
    this.logger.log(`(${xRequestId}) ${message}`);
    await firstValueFrom(
      this.client.emit('logger', {
        logSid: xRequestId,
        type: 'info',
        clientId: this.configService.get('APP.CLIENT_ID'),
        serviceId: this.configService.get('SERVICE_ID'),
        message,
      }),
    ).catch((error: AggregateError) => {
      if (error.errors?.length > 0) {
        return this.logger.error(
          `${error.errors[0].message} ${message}`,
          error.errors[0].stack,
        );
      } else {
        return this.logger.error(`${error.message} ${message}`, error.stack);
      }
    });
  }

  /**
   * Logs an error message and emits a logger event.
   *
   * @param xRequestId - The unique request identifier.
   * @param message - The error message to log.
   * @param errorCode - The error code associated with the error.
   * @param stack - Optional. The stack trace or additional error details.
   *
   * This method logs an error message using the internal logger and emits a logger event
   * to an external client. If the event emission fails, it logs the error details.
   */
  public error(
    xRequestId: string,
    message: string,
    errorCode: string,
    stack?: any,
  ): void {
    this.logger.error(`(${xRequestId}) ${message}`, stack);
    firstValueFrom(
      this.client.emit('logger', {
        logSid: xRequestId,
        type: 'error',
        clientId: this.configService.get('APP.CLIENT_ID'),
        serviceId: this.configService.get('SERVICE_ID'),
        message,
        detail: stack,
        code: errorCode,
      }),
    ).catch((error: AggregateError) => {
      if (error.errors?.length > 0) {
        return this.logger.error(
          `${error.errors[0].message} ${message}`,
          error.errors[0].stack,
        );
      } else {
        return this.logger.error(`${error.message} ${message}`, error.stack);
      }
    });
  }
}
