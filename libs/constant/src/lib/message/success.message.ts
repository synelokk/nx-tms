import * as ID from './id/message';
import * as ENG from './en/message';
import { createResponse, ISuccessResponse } from './message.interface';
import { SuccessStatusCode } from './code.message';

/**
 * Interface representing success messages in different languages.
 *
 * @property {typeof ID.SuccessResponse} ID - Success message in Indonesian.
 * @property {typeof ENG.SuccessResponse} EN - Success message in English.
 */
interface ISuccessLanguage {
  ID: typeof ID.SuccessResponse;
  EN: typeof ENG.SuccessResponse;
}

/**
 * Represents a type for a successful response message.
 *
 * This type can be either:
 * - A record where the keys are from `ID.SuccessResponse` and the values are `ISuccessResponse<T>`.
 * - A record where the keys are from `ENG.SuccessResponse` and the values are `ISuccessResponse<T>`.
 *
 * @template T - The type of the data contained in the success response.
 */
type TSuccessResponseType<T> =
  | Record<keyof typeof ID.SuccessResponse, ISuccessResponse<T>>
  | Record<keyof typeof ENG.SuccessResponse, ISuccessResponse<T>>;

/**
 * Generates a success response object based on the provided message object.
 *
 * @param message - The message object containing success messages. It can be of type `ID.SuccessResponse` or `ENG.SuccessResponse`.
 * @returns A success response object where each key corresponds to a message key, and each value is a response object with a status code and message.
 */
function generateResponse(
  message: typeof ID.SuccessResponse | typeof ENG.SuccessResponse
): TSuccessResponseType<any> {
  return Object.keys(message).reduce((acc: Record<string, any>, type) => {
    acc[type] = createResponse({
      statusCode: SuccessStatusCode.SUCCESS,
      message: message[type as keyof typeof message].message,
    });
    return acc;
  }, {} as TSuccessResponseType<any>);
}

/**
 * A constant object that maps language keys to their respective success response messages.
 *
 * @constant
 * @type {Record<keyof ISuccessLanguage, TSuccessResponseType<any>>}
 *
 * @property {TSuccessResponseType<any>} ID - The success response message in Indonesian.
 * @property {TSuccessResponseType<any>} EN - The success response message in English.
 */
export const SuccessResponse: Record<
  keyof ISuccessLanguage,
  TSuccessResponseType<any>
> = {
  ID: generateResponse(ID.SuccessResponse),
  EN: generateResponse(ENG.SuccessResponse),
};
