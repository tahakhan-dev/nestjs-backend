/**
 * System Constants Module
 *
 * This module is responsible for loading and initializing system-wide constants
 * from the application's configuration service. These constants are dynamically
 * populated during runtime from environment variables or configuration files 
 * and made accessible throughout the application.
 *
 * The constants defined here are critical for configuring key aspects of the 
 * application's behavior, including API paths, application metadata, and logging settings.
 */

import { ConfigService } from '@nestjs/config';

/**
 * Loads System-Wide Constants
 *
 * Dynamically retrieves configuration values using the provided `ConfigService`.
 * These values are sourced from environment variables or configuration files 
 * and are used to define essential settings for the application.
 *
 * @param {ConfigService} configService - The instance of `ConfigService` provided by NestJS 
 *                                         to access application configuration settings.
 * @returns {object} An object containing key system constants for the application.
 */
export const loadSystemConstants = (configService: ConfigService) => ({
    /**
     * Application Version
     *
     * Specifies the current version of the application. This is retrieved from 
     * the `app.version` configuration value.
     */
    APP_VERSION: configService.get<string>('app.version'),

    /**
     * Logging Configuration
     *
     * Determines whether logging is enabled for TypeORM or other services. 
     * This is retrieved from the `app.logging` configuration value and 
     * is expected to be a boolean.
     */
    ENABLE_LOGGING: configService.get<boolean>('app.logging'),

    /**
     * API Base Path
     *
     * Specifies the base path for the application's API. This value is 
     * retrieved from the `app.api_path` configuration setting.
     */
    API_PATH: configService.get<string>('app.api_path'),
});

/**
 * Global System Constants Object
 *
 * A global object that stores system-wide constants after they are loaded. 
 * This object is initialized with the values returned by the `loadSystemConstants` 
 * function and provides a centralized source of constants used throughout the application.
 */
export let SYSTEM_CONSTANT: ReturnType<typeof loadSystemConstants>;

/**
 * Initializes System Constants
 *
 * Loads the system-wide constants from the provided `ConfigService` and assigns 
 * them to the `SYSTEM_CONSTANT` object. This function should be called during 
 * the application's startup process to ensure the constants are available 
 * throughout the application's lifecycle.
 *
 * @param {ConfigService} configService - The instance of `ConfigService` provided by NestJS 
 *                                         to load configuration settings.
 */
export const initializeSystemConstants = (configService: ConfigService) => {
    SYSTEM_CONSTANT = loadSystemConstants(configService);
};
