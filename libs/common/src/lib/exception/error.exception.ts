import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from 'sequelize';
import {
  FailedInsertException,
  InvalidColumnException,
  InvalidTableException,
} from './database.exception';
import {
  DataAlreadyExistsException,
  DataNotFoundException,
  InvalidCredentialsException,
  InvalidTokenException,
  TokenExpiredException,
  TokenNotFoundException,
  TokenRequiredException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from './http.exception';
import { HttpStatus, ErrorResponseDTO } from '@tms/constant';
import {
  BaseException,
  createResponse,
  TOptionsErrorException,
} from './base.exception';

/**
 * @class ErrorException
 * @description A service that handles various types of exceptions and creates appropriate error responses.
 *
 * @param {TOptionsErrorException} options - The options for creating the error exception.
 * @param {string} options.language - The language for the error message.
 * @param {Error} options.error - The original error object.
 * @param {string} options.message - The custom error message.
 * @param {string} options.timezone - The timezone for the error message.
 * @param {string} options.env - The environment in which the error occurred.
 *
 * @returns {BaseException} - The appropriate exception based on the type of error.
 *
 * @example
 * ```typescript
 * throw new ErrorException({
 *   language: 'en',
 *   error: new UserNotFoundException(),
 *   message: 'User not found',
 *   timezone: 'UTC',
 *   env: 'production',
 * });
 * ```
 */
@Injectable()
export class ErrorException {
  constructor({
    requestId,
    language,
    error,
    message,
    timezone,
    env,
  }: TOptionsErrorException) {
    let exception: BaseException;
    switch (error.constructor) {
      case UserNotFoundException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'USER_NOT_FOUND',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new UserNotFoundException(bodyResponse);
        break;
      }
      case UserAlreadyExistsException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'USER_ALREADY_EXISTS',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new UserAlreadyExistsException(bodyResponse);
        break;
      }
      case InvalidCredentialsException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'INVALID_CREDENTIALS',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new InvalidCredentialsException(bodyResponse);
        break;
      }
      case InvalidTokenException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'INVALID_TOKEN',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new InvalidTokenException(bodyResponse);
        break;
      }
      case TokenExpiredException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'TOKEN_EXPIRED',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new TokenExpiredException(bodyResponse);
        break;
      }
      case TokenNotFoundException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'TOKEN_NOT_FOUND',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new TokenNotFoundException(bodyResponse);
        break;
      }
      case TokenRequiredException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'TOKEN_REQUIRED',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new TokenRequiredException(bodyResponse);
        break;
      }
      case DataNotFoundException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'DATA_NOT_FOUND',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new DataNotFoundException(bodyResponse);
        break;
      }
      case DataAlreadyExistsException: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'DATA_AVAILABLE',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new DataAlreadyExistsException(bodyResponse);
        break;
      }
      default: {
        const bodyResponse = createResponse({
          requestId,
          language,
          type: 'INTERNAL_SERVER_ERROR',
          message,
          timezone,
          error,
          env,
        }) as ErrorResponseDTO<any>;
        exception = new InternalServerErrorException(bodyResponse);
        break;
      }
    }
    exception.stack = error.stack;
    return exception;
  }
}

/**
 * Represents a custom exception for database-related errors.
 *
 * @class DatabaseException
 *
 * @param {TOptionsErrorException} options - The options for the exception.
 * @param {string} options.language - The language for the error message.
 * @param {Error} options.error - The original error object.
 * @param {string} options.message - The custom error message.
 * @param {string} options.timezone - The timezone for the error message.
 * @param {string} options.env - The environment in which the error occurred.
 *
 * @returns {BaseException | DatabaseError} - The constructed exception object.
 *
 * The constructor checks the error message to determine the type of database error
 * and creates an appropriate exception object. It handles the following cases:
 * - 'column name': Creates an InvalidColumnException.
 * - 'table': Creates an InvalidTableException.
 * - 'column does not allow nulls': Creates a FailedInsertException.
 * - Any other error: Creates a generic BaseException with a 'DATABASE_ERROR' key.
 *
 * The stack trace of the original error is assigned to the constructed exception.
 */
export class DatabaseException {
  constructor({
    requestId,
    language,
    error,
    message,
    timezone,
    env,
  }: TOptionsErrorException) {
    let exception: BaseException | DatabaseError;
    if (error.message.indexOf('column name') !== -1) {
      const bodyResponse = createResponse({
        requestId,
        language,
        type: 'INVALID_COLUMN',
        message,
        timezone,
        error,
        env,
      }) as ErrorResponseDTO<any>;
      exception = new InvalidColumnException(bodyResponse);
    } else if (error.message.indexOf('Invalid object name') !== -1) {
      const bodyResponse = createResponse({
        requestId,
        language,
        type: 'INVALID_TABLE',
        message,
        timezone,
        error,
        env,
      }) as ErrorResponseDTO<any>;
      exception = new InvalidTableException(bodyResponse);
    } else if (error.message.indexOf('Cannot insert the value NULL') !== -1) {
      const bodyResponse = createResponse({
        requestId,
        language,
        type: 'INSERT_FAILED',
        message,
        timezone,
        error,
        env,
      }) as ErrorResponseDTO<any>;
      exception = new FailedInsertException(bodyResponse);
    } else {
      const bodyResponse = createResponse({
        requestId,
        language,
        type: 'DATABASE_ERROR',
        message,
        timezone,
        error,
        env,
      }) as ErrorResponseDTO<any>;
      exception = new BaseException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        bodyResponse
      );
    }

    exception.stack = error.stack;
    return exception;
  }
}
