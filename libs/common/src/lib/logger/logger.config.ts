import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';

import winstonDailyRotateFile from 'winston-daily-rotate-file';

export class LoggerConfig {
  /**
   * Creates an instance of the LoggerConfig.
   *
   * @param appName - The name of the application.
   */
  constructor(public appName: string) {}

  /**
   * Configuration for the Winston logger used in the application.
   *
   * @property {WinstonModuleOptions} loggerConfig - The configuration object for Winston logger.
   * @property {Object} loggerConfig.defaultMeta - Default metadata to include in log entries.
   * @property {string} loggerConfig.defaultMeta.service - The name of the application service.
   * @property {string} loggerConfig.level - The logging level, defaulting to 'info' if not specified in environment variables.
   * @property {boolean} loggerConfig.exitOnError - Flag to indicate if the logger should exit on error.
   * @property {winston.Logform.Format} loggerConfig.format - The format of the log entries, set to JSON.
   * @property {winston.transport[]} loggerConfig.transports - Array of transport instances for logging.
   *
   * The transports include:
   * - Console transport with combined format including timestamp, milliseconds, errors with stack trace, and Nest-like formatting.
   * - Daily rotate file transport for general logs with a maximum file size of 5MB and retention of 3 days.
   * - Daily rotate file transport for error logs with retention of 14 days.
   */
  public readonly loggerConfig: WinstonModuleOptions = {
    defaultMeta: { service: this.appName },
    level: process.env['LOG_LEVEL'] || 'info',
    exitOnError: false,
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          winston.format.ms(),
          winston.format.errors({ stack: true }),
          nestWinstonModuleUtilities.format.nestLike(this.appName, {
            colors: true,
            prettyPrint: true,
            processId: true,
          }),
        ),
      }),
      new winstonDailyRotateFile({
        dirname: 'logs',
        filename: `Service${this.appName}-LOG`,
        extension: '.log',
        level: process.env['LOG_LEVEL'],
        maxFiles: '3d',
        maxSize: '5m',
      }),
      new winstonDailyRotateFile({
        dirname: 'logs',
        filename: `Service${this.appName}-ERROR`,
        extension: '.log',
        level: 'error',
        maxFiles: '14d',
      }),
    ],
  };

  /**
   * Retrieves the logger configuration.
   *
   * @returns {WinstonModuleOptions} The current logger configuration.
   */
  public getLoggerConfig(): WinstonModuleOptions {
    return this.loggerConfig;
  }
}
