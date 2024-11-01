import ErrorMessage from './error.json';
import SuccessMessage from './success.json';

/**
 * Interface representing a response message.
 *
 * @interface IResponse
 * @property {string} key - A unique identifier for the message.
 * @property {string} message - The content of the response message.
 */
interface IResponse {
  type: string;
  message: string;
}

/**
 * Represents a response type that can be either an error or a success message.
 *
 * This type is a union of two possible record types:
 * - A record where the keys are from the `ErrorMessage` enum and the values are of type `IResponse`.
 * - A record where the keys are from the `SuccessMessage` enum and the values are of type `IResponse`.
 */
type TResponse =
  | Record<keyof typeof ErrorMessage, IResponse>
  | Record<keyof typeof SuccessMessage, IResponse>;

/**
 * Generates a response object from the given message object.
 *
 * @param message - The message object, which can be either an ErrorMessage or a SuccessMessage.
 * @returns A response object where each key from the message object is mapped to an object containing the key and the corresponding message.
 */
function generateResponse(
  message: typeof ErrorMessage | typeof SuccessMessage
): TResponse {
  return Object.keys(message).reduce((acc: Record<string, IResponse>, type) => {
    acc[type] = {
      type,
      message: message[type as keyof typeof message],
    };
    return acc;
  }, {} as TResponse);
}

/**
 * A constant that maps each key of the `ErrorMessage` enum to an `IResponse` object.
 * This mapping is generated using the `generateResponse` function.
 *
 * @constant
 * @type {Record<keyof typeof ErrorMessage, IResponse>}
 */
export const ErrorResponse: Record<keyof typeof ErrorMessage, IResponse> =
  generateResponse(ErrorMessage) as Record<
    keyof typeof ErrorMessage,
    IResponse
  >;

/**
 * A constant that maps each key of the `SuccessMessage` enum to an `IResponse` object.
 * This is generated using the `generateResponse` function.
 *
 * @constant
 * @type {Record<keyof typeof SuccessMessage, IResponse>}
 */
export const SuccessResponse: Record<keyof typeof SuccessMessage, IResponse> =
  generateResponse(SuccessMessage) as Record<
    keyof typeof SuccessMessage,
    IResponse
  >;

/**
 * Defines the possible response types for the application.
 *
 * @typedef {typeof ErrorResponse | typeof SuccessResponse} ResponseType
 */
export type ResponseType = typeof ErrorResponse | typeof SuccessResponse;
