import { Global, Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { LoggerModule } from './logger';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationModule } from './configuration';

/**
 * CommonModule is a NestJS module that configures and provides common services
 * and configurations used across the application.
 *
 * @module CommonModule
 *
 * @description
 * This module imports several other modules and configures the ThrottlerModule
 * with different rate-limiting strategies:
 * - `short`: 1 second TTL with a limit of 3 requests.
 * - `medium`: 10,000 seconds TTL with a limit of 20 requests.
 * - `long`: 60,000 seconds TTL with a limit of 100 requests.
 *
 * The module also imports the following modules:
 * - `ConfigurationModule`: Handles application configuration.
 * - `LoggerModule`: Provides logging capabilities.
 * - `AuthorizationModule`: Manages authorization and access control.
 *
 * @imports ThrottlerModule, ConfigurationModule, LoggerModule, AuthorizationModule
 */

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    ConfigurationModule,
    LoggerModule,
    AuthorizationModule,
  ],
  providers: [],
  exports: [],
})
export class CommonModule {}
