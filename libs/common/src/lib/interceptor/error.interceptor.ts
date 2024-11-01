import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ERROR_MESSAGE_METADATA } from '../interface';
import { Logger } from '../logger';
import { DatabaseException, ErrorException } from '../exception';
import { guid, randomChar } from '@tms/utils';
import { ENVIRONMENT } from '@tms/constant';
import { IErrorMessageOptions } from '../interface';

/**
 * Interceptor to handle errors in NestJS applications.
 *
 * This interceptor catches errors thrown during the request handling process,
 * logs them using a custom logger, and rethrows them as custom exceptions.
 *
 * @class
 * @implements {NestInterceptor}
 *
 * @constructor
 * @param {Logger} logger - The custom logger instance for logging errors.
 * @param {Reflector} reflector - The reflector instance for accessing metadata.
 *
 * @method intercept
 * @param {ExecutionContext} context - The execution context of the request.
 * @param {CallHandler} next - The next handler in the request pipeline.
 * @returns {Observable<any>} - An observable that either emits the response or an error.
 *
 * @example
 * // Usage in a controller
 * @UseInterceptors(ErrorInterceptor)
 * @Get()
 * async getData() {
 *   // Your code here
 * }
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: Logger,
    private readonly reflector: Reflector,
  ) {}

  /**
   * Intercepts the execution context and handles errors that occur during the request lifecycle.
   *
   * @param context - The execution context which provides details about the current request.
   * @param next - The call handler which allows the request to proceed to the next interceptor or handler.
   * @returns An observable that either emits the response or throws an error.
   *
   * The interceptor performs the following actions:
   * - Extracts the request object and retrieves the language from the query parameters or defaults to 'ID'.
   * - Retrieves the 'x-request-id' from the request headers or generates a new GUID.
   * - Fetches a custom error message from the metadata if available.
   * - Catches any errors that occur during the request handling:
   *   - If the error is a `SequelizeDatabaseError`, it wraps it in a `DatabaseException`.
   *   - Otherwise, it wraps the error in an `ErrorException` and assigns a random error code.
   * - Removes the error stack trace in non-development environments.
   * - Logs the error and a warning with the request details.
   * - Throws the processed error.
   */
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const language = req?.query?.lang || 'ID';
    const xRequestId = req?.headers ? req?.headers['x-request-id'] : guid();

    const customError = this.reflector.get<IErrorMessageOptions>(
      ERROR_MESSAGE_METADATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      catchError((error) => {
        console.log(error);
        let err = error;
        if (err.name === 'SequelizeDatabaseError') {
          err = new DatabaseException({
            requestId: xRequestId,
            language,
            error,
          });
        } else {
          err.errorCode = `ERROR-${randomChar(16)}`;
          err = new ErrorException({
            requestId: xRequestId,
            language,
            error,
            message: customError?.message ?? null,
            env: process.env['NODE_ENV'] as keyof typeof ENVIRONMENT,
            timezone: process.env['TIMEZONE'],
          });
        }

        if (process.env['NODE_ENV'] !== 'development') {
          err.stack = undefined;
        }

        this.logger.error(
          xRequestId,
          customError?.message ?? error?.message ?? null,
          err?.cause ?? null,
          err?.stack ?? null,
        );
        this.logger.warn(
          xRequestId,
          `Response ${req?.protocol}://${req?.get('Host')}${req?.originalUrl}`,
          customError?.message ?? null,
        );
        return throwError(() => err);
      }),
    );
  }
}
