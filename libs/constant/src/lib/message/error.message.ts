import * as ID from './id/message';
import * as ENG from './en/message';
import { createResponse, IErrorResponse } from './message.interface';
import { ErrorStatusCode } from './code.message';
import { HttpMessage } from './http.message';

/**
 * Interface representing error messages in different languages.
 *
 * @property {typeof ID.ErrorResponse} ID - Error messages in Indonesian.
 * @property {typeof ENG.ErrorResponse} EN - Error messages in English.
 */
interface IErrorLanguage {
  ID: typeof ID.ErrorResponse;
  EN: typeof ENG.ErrorResponse;
}

/**
 * Represents a type for error responses.
 *
 * This type can be either:
 * - A record where the types are from `ID.ErrorResponse` and the values are `IErrorResponse<T>`.
 * - A record where the types are from `ENG.ErrorResponse` and the values are `IErrorResponse<T>`.
 *
 * @template T - The type of the data contained in the error response.
 */
type TErrorResponseType<T> =
  | Record<keyof typeof ID.ErrorResponse, IErrorResponse<T>>
  | Record<keyof typeof ENG.ErrorResponse, IErrorResponse<T>>;

/**
 * Generates a response object based on the provided error messages.
 *
 * @param message - An object containing error messages, which can be of type `ID.ErrorResponse` or `ENG.ErrorResponse`.
 * @returns A response object where each key corresponds to an error type and contains a response with appropriate status code and messages.
 *
 * The function processes the types in the `message` object and creates a response for each key based on the following conditions:
 * - If the type contains 'NOT_FOUND', the response will have a status code of `ErrorStatusCode.NOT_FOUND` and an error message of `HttpMessage.NOT_FOUND`.
 * - If the type contains 'EXISTS', the response will have a status code of `ErrorStatusCode.EXISTS` and an error message of `HttpMessage.CONFLICT`.
 * - If the type contains 'INVALID', the response will have a status code of `ErrorStatusCode.INVALID` and an error message of `HttpMessage.UNPROCESSABLE_ENTITY`.
 * - If the type contains 'EXPIRED', the response will have a status code of `ErrorStatusCode.EXPIRED` and an error message of `HttpMessage.BAD_REQUEST`.
 * - If the type contains 'REQUIRED', the response will have a status code of `ErrorStatusCode.REQUIRED` and an error message of `HttpMessage.BAD_REQUEST`.
 * - For any other type, the response will have a status code of `ErrorStatusCode.INTERNAL` and an error message of `HttpMessage.INTERNAL_SERVER_ERROR`.
 */
function generateResponse(
  message: typeof ID.ErrorResponse | typeof ENG.ErrorResponse
): TErrorResponseType<any> {
  return Object.keys(message).reduce((acc: Record<string, any>, type) => {
    if (
      message[type as keyof typeof message].type.indexOf('NOT_FOUND') !== -1
    ) {
      acc[type] = createResponse({
        statusCode: ErrorStatusCode.NOT_FOUND,
        message: message[type as keyof typeof message].message,
        errorMessage: HttpMessage.NOT_FOUND,
      });
    } else if (
      message[type as keyof typeof message].type.indexOf('EXISTS') !== -1
    ) {
      acc[type] = createResponse({
        statusCode: ErrorStatusCode.EXISTS,
        message: message[type as keyof typeof message].message,
        errorMessage: HttpMessage.CONFLICT,
      });
    } else if (
      message[type as keyof typeof message].type.indexOf('INVALID') !== -1
    ) {
      acc[type] = createResponse({
        statusCode: ErrorStatusCode.INVALID,
        message: message[type as keyof typeof message].message,
        errorMessage: HttpMessage.UNPROCESSABLE_ENTITY,
      });
    } else if (
      message[type as keyof typeof message].type.indexOf('EXPIRED') !== -1
    ) {
      acc[type] = createResponse({
        statusCode: ErrorStatusCode.EXPIRED,
        message: message[type as keyof typeof message].message,
        errorMessage: HttpMessage.BAD_REQUEST,
      });
    } else if (
      message[type as keyof typeof message].type.indexOf('REQUIRED') !== -1
    ) {
      acc[type] = createResponse({
        statusCode: ErrorStatusCode.REQUIRED,
        message: message[type as keyof typeof message].message,
        errorMessage: HttpMessage.BAD_REQUEST,
      });
    } else {
      acc[type] = createResponse({
        statusCode: ErrorStatusCode.INTERNAL,
        message: message[type as keyof typeof message].message,
        errorMessage: HttpMessage.INTERNAL_SERVER_ERROR,
      });
    }
    return acc;
  }, {} as TErrorResponseType<any>);
}

/**
 * A constant object that maps error response messages to different languages.
 *
 * @constant
 * @type {Record<keyof IErrorLanguage, TErrorResponseType<any>>}
 *
 * @property {TErrorResponseType<any>} ID - The error response message in Indonesian.
 * @property {TErrorResponseType<any>} EN - The error response message in English.
 */
export const ErrorResponse: Record<
  keyof IErrorLanguage,
  TErrorResponseType<any>
> = {
  ID: generateResponse(ID.ErrorResponse),
  EN: generateResponse(ENG.ErrorResponse),
};
