/**
 * A constant representing the metadata key for success messages.
 * This key can be used to store or retrieve success message metadata
 * in various parts of the application.
 */
export const SUCCESS_MESSAGE_METADATA = 'successMessage';

/**
 * A constant representing the metadata key for error messages.
 * This key can be used to store or retrieve error message metadata
 * in various parts of the application.
 */
export const ERROR_MESSAGE_METADATA = 'errorMessage';

export interface ISuccessMessageOptions {
  httpStatus: number;
  message: string;
}

export interface IErrorMessageOptions {
  message: string;
}
