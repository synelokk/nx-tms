import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP } from './configuration.config';
import { ConfigurationService } from './configrutaion.service';
import { ClientRoleRepository } from '../database/client/repository/client-role.repository';
import { ClientRepository } from '../database/client/repository/client.repository';
/**
 * An array of environment file names used for configuration.
 *
 * The array includes:
 * - `.env`: The default environment file.
 * - `.env.local`: The local environment file, typically used for local development overrides.
 * - `.env.development`: The development environment file, used for development-specific settings.
 */
const ENV = [`.env`, `.env.local`, `.env.development`];

/**
 * ConfigurationModule is a NestJS module that sets up the global configuration for the application.
 *
 * @module ConfigurationModule
 *
 * @description
 * This module imports the ConfigModule from `@nestjs/config` and configures it to be global and cached.
 * It loads the configuration from the specified environment file paths and the provided configuration object.
 *
 * @imports
 * - ConfigModule: The module responsible for handling application configuration.
 *
 * @config
 * - isGlobal: Indicates that the configuration should be available globally across the application.
 * - cache: Enables caching of the configuration to improve performance.
 * - load: An array of configuration objects to be loaded.
 * - envFilePath: The path to the environment file(s) to be loaded.
 */

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [APP],
      envFilePath: ENV,
    }),
  ],
  providers: [ConfigurationService, ClientRoleRepository, ClientRepository],
  exports: [ConfigurationService, ClientRoleRepository, ClientRepository],
})
export class ConfigurationModule {}
