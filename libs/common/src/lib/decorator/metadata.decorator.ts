import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Constant representing the metadata key for the logger.
 * This key is used to store and retrieve logger-related metadata.
 */
export const LOGGER_METADATA = 'logger';

/**
 * A decorator that sets a custom metadata key-value pair for logging purposes.
 *
 * @param message - The log message to be associated with the metadata.
 * @returns A custom decorator that sets the LOGGER_METADATA key with the provided message.
 */
export const DecoratorLogger = (message: string): CustomDecorator =>
  SetMetadata(LOGGER_METADATA, message);
