import { CustomDecorator, SetMetadata } from '@nestjs/common';
import {
  ERROR_MESSAGE_METADATA,
  IErrorMessageOptions,
  ISuccessMessageOptions,
  SUCCESS_MESSAGE_METADATA,
} from '../interface';

/**
 * A decorator that sets a success message metadata on the target.
 *
 * @param message - The success message to be set as metadata.
 * @returns A custom decorator that sets the success message metadata.
 */
export const SuccessMessage = ({
  httpStatus,
  message,
}: ISuccessMessageOptions): CustomDecorator =>
  SetMetadata(SUCCESS_MESSAGE_METADATA, {
    httpStatus,
    message,
  } as ISuccessMessageOptions);

/**
 * A decorator that sets a custom error message metadata.
 *
 * @param message - The error message to be set as metadata.
 * @returns A custom decorator that sets the error message metadata.
 */
export const ErrorMessage = (message: string): CustomDecorator =>
  SetMetadata(ERROR_MESSAGE_METADATA, {
    message,
  } as IErrorMessageOptions);

export interface IMessageOptions {
  success?: ISuccessMessageOptions;
  failed?: IErrorMessageOptions;
}

export type TMessageOptions = IMessageOptions;
