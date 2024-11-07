import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger';
import { guid } from '@tms/utils';

@Injectable()
/**
 * Middleware to handle incoming requests and log relevant information.
 *
 * @class RequestMiddleware
 * @implements {NestMiddleware}
 *
 * @constructor
 * @param {Logger} logger - A custom logger instance for logging request details.
 *
 * @method use
 * @async
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the middleware has completed its task.
 *
 * @description
 * This middleware generates a unique request ID for each incoming request, attaches it to the request headers,
 * and logs the request details including the URL and request body. It then calls the next middleware in the stack.
 */
export class RequestMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  public async use(req: Request, _: Response, next: Function): Promise<void> {
    const url = `${req.protocol}://${req.get('Host')}${req.originalUrl}`;
    const xRequestId = guid();
    req.headers['x-request-id'] = xRequestId;
    await this.logger.warn(
      xRequestId,
      `Request ${url}`,
      JSON.stringify(req.body),
    );
    await next();
  }
}
