import { HttpStatus } from '@tms/constant';
import { BaseException } from './base.exception';

/**
 * @class UserNotFoundException
 * Exception thrown when a user is not found.
 *
 * @extends {BaseException}
 *
 * @param {string | Record<string, any>} [message] - Optional message or additional details about the exception.
 *
 * @example
 * throw new UserNotFoundException('User not found');
 *
 * @example
 * throw new UserNotFoundException({ error: 'User not found', code: 'AUTH_001' });
 */
export class UserNotFoundException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

/**
 * @class UserAlreadyExistsException
 * Exception thrown when attempting to create a user that already exists.
 *
 * @extends BaseException
 *
 * @param message - Optional message or additional details about the exception.
 *
 * @example
 * throw new UserAlreadyExistsException('User already exists');
 *
 * @example
 * throw new UserAlreadyExistsException({ error: 'User already exists', code: 'AUTH_002' });
 */
export class UserAlreadyExistsException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.CONFLICT, message);
  }
}

/**
 * @class InvalidCredentialsException
 * Exception thrown when invalid credentials are provided.
 *
 * @extends BaseException
 *
 * @param message - Optional. A string or an object containing additional details about the exception.
 *
 * @example
 * throw new InvalidCredentialsException('Invalid username or password');
 *
 * @example
 * throw new InvalidCredentialsException({ error: 'Invalid username or password', code: 'AUTH_001' });
 */
export class InvalidCredentialsException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

/**
 * @class InvalidTokenException
 * Exception thrown when an invalid token is encountered.
 *
 * @extends {BaseException}
 *
 * @param {string | Record<string, any>} [message] - Optional message or additional information about the exception.
 *
 * @example
 * throw new InvalidTokenException('Token is invalid');
 *
 * @example
 * throw new InvalidTokenException({ error: 'Token is invalid', code: 'AUTH_003' });
 */
export class InvalidTokenException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

/**
 * @class TokenExpiredException
 * Exception thrown when a token has expired.
 *
 * @extends BaseException
 *
 * @param message - Optional. A string or an object containing additional information about the exception.
 *
 * @example
 * throw new TokenExpiredException('Token has expired');
 *
 * @example
 * throw new TokenExpiredException({ error: 'Token has expired', code: 'AUTH_004' });
 */
export class TokenExpiredException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

/**
 * @class TokenNotFoundException
 * Exception thrown when a token is not found.
 *
 * @extends BaseException
 *
 * @param message - Optional. A string or an object containing additional information about the exception.
 *
 * @example
 * throw new TokenNotFoundException('Token not found');
 *
 * @example
 * throw new TokenNotFoundException({ error: 'Token not found', code: 'AUTH_005' });
 */
export class TokenNotFoundException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

/**
 * @class TokenRequiredException
 * Exception thrown when a token is required but not provided.
 *
 * @extends {BaseException}
 *
 * @param {string | Record<string, any>} [message] - Optional message or additional details about the exception.
 *
 * @example
 * throw new TokenRequiredException('Token is required');
 *
 * @example
 * throw new TokenRequiredException({ error: 'Token is required', code: 'AUTH_006' });
 */
export class TokenRequiredException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

/**
 * @class InternalServerErrorException
 * Exception class representing an internal server error.
 *
 * This exception should be thrown when an unexpected condition
 * was encountered and no more specific message is suitable.
 *
 * @extends {BaseException}
 *
 * @param {string | Record<string, any>} [message] - Optional message or additional details about the error.
 *
 * @example
 * throw new InternalServerErrorException('An unexpected error occurred');
 *
 * @example
 * throw new InternalServerErrorException({ error: 'An unexpected error occurred', code: 'SERVER_001' });
 */
export class InternalServerErrorException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

/**
 * @class InvalidColumnException
 * Exception thrown when requested data is not found.
 *
 * @extends BaseException
 *
 * @param message - Optional message or object providing additional details about the exception.
 *
 * @example
 * throw new DataNotFoundException('Data not found');
 *
 * @example
 * throw new DataNotFoundException({ error: 'Data not found', code: 'DATA_001' });
 */
export class DataNotFoundException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

/**
 * @class DataAlreadyExistsException
 * Exception thrown when attempting to create or add data that already exists.
 * Extends the `BaseException` class.
 *
 * @extends {BaseException}
 *
 * @param {string | Record<string, any>} [message] - Optional message or detailed information about the exception.
 *
 * @example
 * throw new DataAlreadyExistsException('Data already exists');
 *
 * @example
 * throw new DataAlreadyExistsException({ error: 'Data already exists', code: 'DATA_002' });
 */
export class DataAlreadyExistsException extends BaseException {
  constructor(message?: string | Record<string, any>) {
    super(HttpStatus.CONFLICT, message);
  }
}
