import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from '../logger';
import { randomChar } from '@tms/utils';
import * as path from 'path';

/**
 * A filter that handles `NotFoundException` and returns a custom 404 HTML page.
 *
 * @class
 * @implements {ExceptionFilter}
 *
 * @constructor
 * @param {Logger} logger - The custom logger instance for logging errors.
 *
 * @method
 * @name catch
 * @memberof NotFoundExceptionFilter
 * @param {*} _ - The exception object (not used).
 * @param {ArgumentsHost} host - The arguments host containing request and response objects.
 * @returns {void}
 *
 * @description
 * This method catches `NotFoundException` and logs the error using the provided `Logger`.
 * It then sends a custom 404 HTML page as the response.
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  public catch(_: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const xRequestId = request.headers['x-request-id'];
    const response = ctx.getResponse();
    this.logger.error(xRequestId, 'Page Not Found', `ERROR-${randomChar(16)}`);
    response.sendFile(path.resolve('./libs/constant/src/frontend/404.html'));
  }
}
