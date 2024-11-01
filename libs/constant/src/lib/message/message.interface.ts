/**
 * Interface representing a response structure.
 */
export interface IResponse {
  requestId: string;
  statusCode: string;
  message: string;
  datetime?: string;
}

/**
 * Type alias for the IResponse interface.
 *
 * @typedef {IResponse} TResponse
 */
export type TResponse = IResponse;

/**
 * Interface representing a successful response.
 *
 * @template T - The type of the data being returned in the response.
 * @extends IResponse
 *
 * @property {T} [data] - Optional data of type T included in the response.
 */
export interface ISuccessResponse<T> extends IResponse {
  data?: T;
}

/**
 * Type alias for a successful response.
 *
 * @template T - The type of the data contained in the successful response.
 */
export type TSuccesResponse<T> = ISuccessResponse<T>;

/**
 * Interface representing an error response.
 *
 * @template T - The type of the error detail.
 * @extends IResponse
 *
 * @property {string} [errorMessage] - A brief message describing the error.
 * @property {T} [errorDetail] - Detailed information about the error.
 * @property {string} [errorCode] - A code representing the specific error.
 */
export interface IErrorResponse<T> extends IResponse {
  errorMessage?: string;
  errorDetail?: T;
  errorCode?: string;
}

/**
 * Represents a type alias for an error response.
 *
 * @template T - The type of the data contained in the error response.
 */
export type TErrorResponse<T> = IErrorResponse<T>;

/**
 * Creates a response object.
 *
 * @template T - The type of the data in the response.
 * @param response - The response object which can be either a success or error response.
 * @returns The same response object that was passed in.
 */
export function createResponse<T>(
  response:
    | Omit<ISuccessResponse<T>, 'requestId'>
    | Omit<IErrorResponse<T>, 'requestId'>
):
  | Omit<ISuccessResponse<T>, 'requestId'>
  | Omit<IErrorResponse<T>, 'requestId'> {
  return response;
}
