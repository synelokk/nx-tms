import { response } from '@tms/constant';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Logger } from '../logger';
import { Reflector } from '@nestjs/core';
import { SUCCESS_MESSAGE_METADATA } from '../interface';
import { Response } from 'express';
import { ISuccessMessageOptions } from '../interface';

/**
 * Intercepts and transforms HTTP responses.
 *
 * This interceptor logs the response and formats it according to the custom success message metadata.
 *
 * @class ResponseInterceptor
 * @implements {NestInterceptor}
 *
 * @constructor
 * @param {Logger} logger - The custom logger instance for logging warnings.
 * @param {Reflector} reflector - The reflector instance for accessing metadata.
 *
 * @method intercept
 * @param {ExecutionContext} context - The execution context of the request.
 * @param {CallHandler} next - The next handler in the request pipeline.
 * @returns {Observable<any>} An observable that emits the transformed response.
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: Logger,
    private readonly reflector: Reflector,
  ) {}
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse<Response>();
    const language = req.query.lang?.toUpperCase() || 'ID';
    return next.handle().pipe(
      map(async (data) => {
        const customSuccess = this.reflector.get<ISuccessMessageOptions>(
          SUCCESS_MESSAGE_METADATA,
          context.getHandler(),
        );
        this.logger.warn(
          req.headers['x-request-id'],
          `Response ${customSuccess.message}`,
        );
        res.status(customSuccess.httpStatus || 200).json(
          instanceToPlain(
            response({
              requestId: req.headers['x-request-id'],
              language: language,
              type: 'SUCCESS',
              data: data,
            }),
          ),
        );
      }),
    );
  }
}
