import {
  ENVIRONMENT,
  HttpStatus,
  response,
  TResponseType,
  ErrorResponseDTO,
} from '@tms/constant';
import { HttpException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

/**
 * BaseException is a custom exception class that extends the HttpException class.
 * It is used to create exceptions with a specific HTTP status and an optional message.
 *
 * @class
 * @extends {HttpException}
 *
 * @param {HttpStatus} status - The HTTP status code for the exception.
 * @param {string | Record<string, any>} [message] - An optional message or object containing additional details about the exception.
 */
export class BaseException extends HttpException {
  constructor(status: HttpStatus, message: string | Record<string, any> = '') {
    super(message, status);
  }
}

/**
 * Options for creating an error exception.
 *
 * @typedef TOptionsErrorException
 *
 * @property {'ID' | 'EN'} language - The language code for the error message.
 * @property {any} error - The error object or message.
 * @property {string} [message] - An optional custom error message.
 * @property {string} [timezone] - An optional timezone string.
 * @property {keyof typeof ENVIRONMENT} [env] - An optional environment key.
 */
export type TOptionsErrorException = {
  requestId: string;
  language: 'ID' | 'EN';
  error: any;
  key?: string;
  message?: string;
  timezone?: string;
  env?: keyof typeof ENVIRONMENT;
};

/**
 * Creates a response object based on the provided options.
 *
 * @param {TOptionsErrorException & { type: TResponseType }} options - The options for creating the response.
 * @param {string} options.language - The language for the response.
 * @param {string} options.type - The type for the response type.
 * @param {string} options.message - The message for the response.
 * @param {string} options.timezone - The timezone for the response.
 * @param {any} options.error - The error details.
 * @param {string} options.env - The environment in which the application is running.
 *
 * @returns {Record<string, any>} The response object.
 */
export function createResponse({
  requestId,
  language,
  type,
  message,
  timezone,
  error,
  env,
}: TOptionsErrorException & { type: TResponseType }): Record<string, any> {
  const bodyResponse = response({
    requestId,
    language,
    type,
    message,
    timezone,
    error,
  }) as ErrorResponseDTO<any>;

  if (env !== ENVIRONMENT.DEVELOPMENT) {
    bodyResponse.errorDetail = undefined;
  }

  return instanceToPlain(bodyResponse);
}

export class BadRequestException {
  constructor({
    requestId,
    language,
    error,
    key,
    message,
    timezone,
    env,
  }: TOptionsErrorException) {
    const bodyResponse = response({
      requestId,
      language,
      type: 'PROPERTY_REQUIRED',
      message,
      timezone,
      error,
    }) as ErrorResponseDTO<any>;

    if (env !== ENVIRONMENT.DEVELOPMENT) {
      bodyResponse.errorDetail = undefined;
    }

    if (key) bodyResponse.message = bodyResponse.message.replace('{key}', key);

    return instanceToPlain(bodyResponse);
  }
}
