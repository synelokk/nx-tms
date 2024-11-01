import * as ID from './id/message';
import * as ENG from './en/message';
import { ErrorResponseDTO, SuccessResponseDTO } from './dto/message.dto';
import { IErrorResponse, ISuccessResponse } from './message.interface';
import { ErrorResponse } from './error.message';
import { SuccessResponse } from './success.message';
import { randomChar } from '@tms/utils';
import { DateNowTimeZone } from '@tms/utils';

/**
 * Represents the options for a response message.
 *
 * @typedef IResponseOptions
 *
 * @property {'ID' | 'EN'} language - The language of the response message.
 * @property {TResponseType} key - The key identifying the type of response.
 * @property {string} [message] - An optional custom message.
 * @property {string} [timezone] - An optional timezone for the response.
 */
type IResponseOptions = {
  requestId: string;
  language: 'ID' | 'EN';
  type: TResponseType;
  message?: string;
  timezone?: string;
};

/**
 * Defines the type for response messages, which can be a key from one of the following:
 * - `ID.ErrorResponse`
 * - `ID.SuccessResponse`
 * - `ENG.ErrorResponse`
 * - `ENG.SuccessResponse`
 */
export type TResponseType =
  | keyof typeof ID.ErrorResponse
  | keyof typeof ID.SuccessResponse
  | keyof typeof ENG.ErrorResponse
  | keyof typeof ENG.SuccessResponse;

/**
 * Generates a success response DTO based on the provided options.
 *
 * @template T - The type of the data to be included in the response.
 * @param {IResponseOptions & { data: T }} options - The options for generating the response.
 * @param {string} options.language - The language of the response.
 * @param {string} options.key - The key to identify the response type.
 * @param {string} [options.message] - An optional custom message for the response.
 * @param {T} options.data - The data to be included in the response.
 * @param {string} options.timezone - The timezone for the response datetime.
 * @returns {SuccessResponseDTO<T>} The success response DTO.
 */
function responseSuccess<T>({
  requestId,
  language,
  type,
  message,
  data,
  timezone,
}: IResponseOptions & { data: T }): SuccessResponseDTO<T> {
  const response = SuccessResponse[language][
    type as keyof typeof message
  ] as ISuccessResponse<T>;
  response.message = message || response.message;
  response.datetime = DateNowTimeZone(timezone || 'Asia/Jakarta');

  response.data = data;
  const successDto = new SuccessResponseDTO<T>({
    requestId,
    statusCode: response.statusCode,
    message: response.message,
    datetime: response.datetime,
    data: response.data,
  });
  return successDto as SuccessResponseDTO<T>;
}

/**
 * Generates an error response DTO based on the provided options.
 *
 * @template T - The type of the response.
 * @param {IResponseOptions & { error?: any }} options - The options for generating the error response.
 * @param {string} options.language - The language for the error response.
 * @param {string} options.key - The key identifying the type of error.
 * @param {string} [options.message] - An optional custom error message.
 * @param {any} [options.error] - An optional error object containing additional error details.
 * @param {string} options.timezone - The timezone for the error response datetime.
 * @returns {ErrorResponseDTO<T>} The generated error response DTO.
 */
function responseError<T>({
  requestId,
  language,
  type,
  message,
  error,
  timezone,
}: IResponseOptions & { error?: any }): ErrorResponseDTO<T> {
  type = type as TResponseType;
  const response = ErrorResponse[language][
    type as keyof typeof message
  ] as IErrorResponse<T>;
  response.errorMessage = message || response?.errorMessage || error?.message;
  response.errorDetail = error?.stack || error;
  response.errorCode = error?.errorCode || randomChar(12);
  response.datetime = DateNowTimeZone(timezone || 'Asia/Jakarta');

  const errorDto = new ErrorResponseDTO({
    requestId,
    statusCode: response.statusCode,
    message: response.message,
    datetime: response.datetime,
    errorMessage: response.errorMessage,
    errorDetail: response.errorDetail,
    errorCode: response.errorCode,
  });

  return errorDto as ErrorResponseDTO<T>;
}

/**
 * Generates a response object based on the provided options.
 *
 * @template T - The type of the data in the response.
 * @param {IResponseOptions & { data?: T; error?: any }} options - The options for generating the response.
 * @param {string} options.language - The language of the response.
 * @param {string} options.key - The key identifying the type of response.
 * @param {string} options.message - The message to include in the response.
 * @param {string} options.timezone - The timezone to use in the response.
 * @param {T} [options.data] - The data to include in the response, if any.
 * @param {any} [options.error] - The error to include in the response, if any.
 * @returns {ErrorResponseDTO<T> | SuccessResponseDTO<T>} - The generated response object, either an error or success response.
 */
export function response<T>({
  requestId,
  language,
  type,
  message,
  timezone,
  data,
  error,
}: IResponseOptions & { data?: T; error?: any }):
  | ErrorResponseDTO<T>
  | SuccessResponseDTO<T> {
  type = type as TResponseType;
  if (process.env['NODE_ENV'] !== 'development') error = undefined;

  if (Object.keys(ErrorResponse[language]).includes(type)) {
    return responseError({
      requestId,
      language,
      type,
      message,
      timezone,
      error,
    });
  }
  return responseSuccess({
    requestId,
    language,
    type,
    message,
    timezone,
    data,
  });
}
