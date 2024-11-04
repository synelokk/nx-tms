import { registerAs, ConfigType } from '@nestjs/config';

/**
 * Configuration for the application.
 *
 * This configuration is registered under the namespace 'APP' and retrieves
 * various settings from environment variables.
 *
 * @property {string} CLIENT_CODE - The client code for the application.
 * @property {string} CLIENT_ID - The client ID for the application.
 * @property {string} CLIENT_KEY - The client key for the application.
 * @property {string} LOG_LEVEL - The logging level for the application.
 * @property {string} LOG_ENABLED - Flag to enable or disable logging.
 * @property {string} TIMEZONE - The timezone setting for the application, defaults to 'Asia/Jakarta'.
 */
export const APP = registerAs('APP', () => ({
  CLIENT_CODE: process.env['CLIENT_CODE'],
  CLIENT_ID: process.env['CLIENT_ID'],
  CLIENT_KEY: process.env['CLIENT_KEY'],

  LOG_LEVEL: process.env['LOG_LEVEL'],
  LOG_ENABLED: process.env['LOG_ENABLED'],

  TIMEZONE: process.env['TIMEZONE'] || 'Asia/Jakarta',
}));

/**
 * Configuration for database authentication.
 *
 * This configuration is registered under the key 'DB_AUTH' and provides
 * the following properties:
 *
 * - `HOST`: The database host, defaulting to '127.0.0.1' if not provided via environment variable `DB_AUTH_HOST`.
 * - `PORT`: The database port, defaulting to 1433 if not provided via environment variable `DB_AUTH_PORT`.
 * - `USER`: The database user, defaulting to 'sa' if not provided via environment variable `DB_AUTH_USER`.
 * - `PASSWORD`: The database password, defaulting to 'Pass@w0rd1!' if not provided via environment variable `DB_AUTH_PASSWORD`.
 * - `NAME`: The database name, defaulting to 'MSN_AUTH' if not provided via environment variable `DB_AUTH_NAME`.
 *
 * @returns An object containing the database authentication configuration.
 */
export const DB_AUTH = registerAs('DB_AUTH', () => ({
  HOST: process.env['DB_AUTH_HOST'] || '127.0.0.1',
  PORT: process.env['DB_AUTH_PORT'] || 1433,
  USER: process.env['DB_AUTH_USER'] || 'root',
  PASSWORD: process.env['DB_AUTH_PASSWORD'] || 'root123',
  NAME: process.env['DB_AUTH_NAME'] || 'MSN_AUTH',
}));

/**
 * Configuration for the database client.
 *
 * This configuration is registered under the key 'DB_CLIENT' and includes the following properties:
 * - `HOST`: The hostname of the database client. Defaults to '127.0.0.1' if not provided in the environment variables.
 * - `PORT`: The port number of the database client. Defaults to 1433 if not provided in the environment variables.
 * - `USER`: The username for the database client. Defaults to 'sa' if not provided in the environment variables.
 * - `PASSWORD`: The password for the database client. Defaults to 'Pass@w0rd1!' if not provided in the environment variables.
 * - `NAME`: The name of the database client. Defaults to 'MSN_CLIENT' if not provided in the environment variables.
 *
 * @returns An object containing the database client configuration.
 */
export const DB_CLIENT = registerAs('DB_CLIENT', () => ({
  HOST: process.env['DB_CLIENT_HOST'] || '127.0.0.1',
  PORT: process.env['DB_CLIENT_PORT'] || 1433,
  USER: process.env['DB_CLIENT_USER'] || 'root',
  PASSWORD: process.env['DB_CLIENT_PASSWORD'] || 'root123',
  NAME: process.env['DB_CLIENT_NAME'] || 'MSN_CLIENT',
}));

/**
 * Configuration for the product database.
 *
 * This configuration is registered under the namespace 'DB_PRODUCT' and includes
 * the following properties:
 *
 * - `HOST`: The hostname of the database server. Defaults to '127.0.0.1'.
 * - `PORT`: The port number on which the database server is listening. Defaults to 1433.
 * - `USER`: The username for authenticating with the database. Defaults to 'sa'.
 * - `PASSWORD`: The password for authenticating with the database. Defaults to 'Pass@w0rd1!'.
 * - `NAME`: The name of the database. Defaults to 'MSN_PRODUCT'.
 *
 * Environment variables can be used to override these default values:
 * - `DB_PRODUCT_HOST`
 * - `DB_PRODUCT_PORT`
 * - `DB_PRODUCT_USER`
 * - `DB_PRODUCT_PASSWORD`
 * - `DB_PRODUCT_NAME`
 */
export const DB_PRODUCT = registerAs('DB_PRODUCT', () => ({
  HOST: process.env['DB_MSN_PRODUCT_HOST'] || '127.0.0.1',
  PORT: process.env['DB_MSN_PRODUCT_PORT'] || 1433,
  USER: process.env['DB_MSN_PRODUCT_USER'] || 'root',
  PASSWORD: process.env['DB_MSN_PRODUCT_PASSWORD'] || 'root123',
  NAME: process.env['DB_MSN_PRODUCT_NAME'] || 'MSN_PRODUCT',
}));

/**
 * Configuration for the database logging service.
 *
 * This configuration is registered under the namespace 'DB_LOG' and includes
 * the following properties:
 *
 * - `HOST`: The hostname or IP address of the database server. Defaults to '127.0.0.1'.
 * - `PORT`: The port number on which the database server is listening. Defaults to 1433.
 * - `USER`: The username for authenticating with the database server. Defaults to 'sa'.
 * - `PASSWORD`: The password for authenticating with the database server. Defaults to 'Pass@w0rd1!'.
 * - `NAME`: The name of the database. Defaults to 'MSN_LOG'.
 *
 * Environment variables can be used to override these default values:
 * - `DB_LOG_HOST`
 * - `DB_LOG_PORT`
 * - `DB_LOG_USER`
 * - `DB_LOG_PASSWORD`
 * - `DB_LOG_NAME`
 *
 * @returns An object containing the database logging configuration.
 */
export const DB_LOG = registerAs('DB_LOG', () => ({
  HOST: process.env['DB_LOG_HOST'] || '127.0.0.1',
  PORT: process.env['DB_LOG_PORT'] || 1433,
  USER: process.env['DB_LOG_USER'] || 'root',
  PASSWORD: process.env['DB_LOG_PASSWORD'] || 'root123',
  NAME: process.env['DB_LOG_NAME'] || 'MSN_LOG',
}));

/**
 * Type alias for the application configuration derived from the APP configuration object.
 *
 * @typedef {ConfigType<typeof APP>} TAppConfig
 */
export type TAppConfig = ConfigType<typeof APP>;

/**
 * Type alias for the configuration type of the `DB_AUTH` constant.
 *
 * This type is derived from the `ConfigType` utility type, which extracts
 * the type of the configuration object associated with `DB_AUTH`.
 *
 * @typedef {ConfigType<typeof DB_AUTH>} TDBAuthConfig
 */
export type TDBAuthConfig = ConfigType<typeof DB_AUTH>;

/**
 * Type alias representing database client configuration derived from the `DB_CLIENT` configuration.
 *
 * @typedef {ConfigType<typeof DB_CLIENT>} TDBClientConfig
 */
export type TDBClientConfig = ConfigType<typeof DB_CLIENT>;

/**
 * Type alias for the configuration of the database product.
 * This type is derived from the `DB_PRODUCT` configuration object.
 *
 * @typedef {ConfigType<typeof DB_PRODUCT>} TDBProductConfig
 */
export type TDBProductConfig = ConfigType<typeof DB_PRODUCT>;

/**
 * Type alias for the configuration type of the DB_LOG.
 * This type is derived from the configuration object defined by DB_LOG.
 *
 * @typedef {ConfigType<typeof DB_LOG>} TDBLogConfig
 */
export type TDBLogConfig = ConfigType<typeof DB_LOG>;
