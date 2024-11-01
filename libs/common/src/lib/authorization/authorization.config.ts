import { registerAs } from '@nestjs/config';

/**
 * Configuration for authorization module.
 *
 * This configuration is registered under the namespace 'AUTH' and includes the following properties:
 *
 * - `JWT_SECRET`: The secret key used for signing JWT tokens. Defaults to 'jwt_secret' if not provided in environment variables.
 * - `JWT_EXPIRES_IN`: The expiration time for JWT tokens. Defaults to '1d' if not provided in environment variables.
 * - `SECRET_PASS`: A secret passphrase used for encryption or other purposes. Defaults to 'secret_pass' if not provided in environment variables.
 * - `SECRET_VECTOR`: A secret vector used for encryption or other purposes. Defaults to 'secret_pass' if not provided in environment variables.
 *
 * @returns An object containing the authorization configuration.
 */
export const AUTH = registerAs('AUTH', () => ({
  JWT_SECRET: process.env['JWT_SECRET'] || 'jwt_secret',
  JWT_EXPIRES_IN: process.env['JWT_EXPIRES_IN'] || '1d',
  SECRET_PASS: process.env['SECRET_PASS'] || 'secret_pass',
  SECRET_VECTOR: process.env['SECRET_VECTOR'] || 'secret_pass',
}));

/**
 * Type representing the configuration for authorization.
 * It is derived from the shape of the `AUTH` object.
 */
export type TAuthConfig = typeof AUTH;
