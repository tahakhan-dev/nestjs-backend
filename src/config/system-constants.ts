/**
 * This module is responsible for loading and initializing system-wide constants
 * from the application's configuration service. These constants are populated
 * dynamically from environment variables or configuration files during runtime
 * and are made available for use throughout the application.
 *
 * The constants defined here are essential for configuring critical application
 * behavior, such as API paths, microservice routes, and throttling limits.
 */

import { ConfigService } from '@nestjs/config';

/**
 * Dynamically loads system-wide constants using the provided configuration service.
 * 
 * This function retrieves configuration values from environment variables or
 * configuration files through the `ConfigService` instance. These values are used
 * to define key settings and paths for the application's operation.
 * 
 * @param {ConfigService} configService - The configuration service instance
 *                                         from NestJS to access application config.
 * @returns {object} An object containing system constants used across the application.
 */
export const loadSystemConstants = (configService: ConfigService) => ({

    // Application metadata
    APP_VERSION: configService.get<string>('app.version'),             // Application's current version

    ENABLE_LOGGING: configService.get<boolean>('app.logging'),         // Enable logging for TypeORM

    API_PATH: configService.get<string>('app.api_path'), // Base path for the application's API


});

/**
 * A global object to store system constants after they are loaded.
 *
 * This object will be initialized with the values returned by `loadSystemConstants`.
 * It provides a single, centralized place to access application-wide constants.
 */
export let SYSTEM_CONSTANT: ReturnType<typeof loadSystemConstants>;

/**
 * Initializes the `SYSTEM_CONSTANT` object by loading constants from the configuration service.
 *
 * This function should be called during the application's startup process to ensure
 * that the system-wide constants are available throughout the application's lifecycle.
 * 
 * @param {ConfigService} configService - The configuration service instance from NestJS.
 */
export const initializeSystemConstants = (configService: ConfigService) => {
    SYSTEM_CONSTANT = loadSystemConstants(configService);
};
