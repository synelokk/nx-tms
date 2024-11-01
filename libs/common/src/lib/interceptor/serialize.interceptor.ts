import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from '../interface';

/**
 * Interceptor that serializes the response data using the provided DTO class.
 * This interceptor transforms the response data into an instance of the specified DTO class
 * before sending it out.
 *
 * @class SerializeInterceptor
 * @implements {NestInterceptor}
 *
 * @constructor
 * @param {ClassConstructor} dto - The DTO class to which the response data should be transformed.
 *
 * @method intercept
 * @param {ExecutionContext} context - The execution context in which the request is being handled.
 * @param {CallHandler} handler - The handler that processes the request.
 * @returns {Observable<any>} An observable that emits the transformed response data.
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  /**
   * Intercepts the request and response to transform the response data.
   *
   * This method runs some logic before the request is handled by the request handler
   * and transforms the response data before it is sent out.
   *
   * @param context - The execution context of the request.
   * @param handler - The call handler to handle the request.
   * @returns An observable that transforms the response data.
   */
  public intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> {
    // run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        if (Array.isArray(data))
          return data.map((item: any) => plainToInstance(this.dto, item));
        else return plainToInstance(this.dto, data);
      }),
    );
  }
}
