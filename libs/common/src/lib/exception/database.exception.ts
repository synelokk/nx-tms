import { HttpStatus } from '@tms/constant';
import { BaseException } from './base.exception';

/**
 * Exception thrown when an invalid column is encountered in the database.
 *
 * @extends BaseException
 *
 * @param {string | Record<string, any>} [message] - Optional message or additional details about the exception.
 */
export class InvalidColumnException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

/**
 * Exception thrown when an invalid table operation is attempted.
 *
 * @extends BaseException
 */
export class InvalidTableException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

/**
 * Exception thrown when an insert operation in the database fails.
 *
 * @extends BaseException
 *
 * @param message - Optional. A string or an object containing additional details about the error.
 */
export class FailedInsertException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

/**
 * Exception thrown when an invalid query is encountered.
 *
 * @extends BaseException
 */
export class InvalidQueryException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
