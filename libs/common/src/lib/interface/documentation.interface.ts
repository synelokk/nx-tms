import { HttpStatus } from '@tms/constant';
import { Type } from '@nestjs/common';

export interface IDocumentationOptions {
  /**
   * The success message of the endpoint.
   */
  status: HttpStatus;

  /**
   * The description of the endpoint.
   */
  description: string;

  /**
   * The summary of the endpoint.
   */
  summary: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type?: Type<unknown> | Function | [Function] | string;

  useAuth?: boolean;
}
