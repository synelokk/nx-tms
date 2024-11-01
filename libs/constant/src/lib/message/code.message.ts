import { HttpStatus } from './http.message';

/**
 * Enum representing success status codes.
 *
 * @enum {string}
 * @property {string} SUCCESS - Represents a successful operation with the code `0000`.
 */
export enum SuccessStatusCode {
  SUCCESS = `0000`,
}

/**
 * Enum representing various error status codes.
 * Each status code is prefixed with a '0' followed by the corresponding HTTP status code.
 *
 * @enum {string}
 */
export enum ErrorStatusCode {
  NOT_FOUND = `0${HttpStatus.NOT_FOUND}`,
  EXISTS = `0${HttpStatus.CONFLICT}`,
  INVALID = `0${HttpStatus.BAD_REQUEST}`,
  EXPIRED = `0${HttpStatus.BAD_REQUEST}`,
  REQUIRED = `0${HttpStatus.BAD_REQUEST}`,
  INTERNAL = `0${HttpStatus.INTERNAL_SERVER_ERROR}`,
}
