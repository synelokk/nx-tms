import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import path from 'path';
import { Logger } from '../logger';
import { randomChar } from '@tms/utils';
import { Request, Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  public catch(_: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const xRequestId = request.headers['x-request-id'] as string;
    this.logger.error(
      xRequestId || '',
      'Forbidden',
      `ERROR-CODE-${randomChar(16)}`,
    );
    return response.sendFile(
      path.resolve('./libs/constant/src/frontend/403.html'),
    );
  }
}
