/**
 * Application Configuration
 *
 * This module defines and exports the application's configuration settings,
 * centralizing critical details such as versioning, ports, security keys, 
 * logging, and environment-specific settings. 
 * It enables consistent and flexible configuration across different environments 
 * (e.g., development, production), leveraging environment variables for customization.
 */

import { AppConfig } from "./config.interface";

export default (): { app: AppConfig } => ({
    app: {
        /**
         * Application Version
         *
         * Specifies the current version of the application. This value is retrieved 
         * from the environment variable `APP_VERSION`. If not defined, it defaults to `'1.0'`.
         */
        version: process?.env?.APP_VERSION || '1.0',

        /**
         * API Header Key
         *
         * Defines the custom HTTP header key used for specifying the API version in requests.
         * Defaults to `'X-API-Version'` for consistency across client-server communication.
         */
        headerKey: 'X-API-Version',

        /**
         * Application Port
         *
         * Specifies the port on which the application will run. This value is retrieved 
         * from the environment variable `PORT`. If not defined, it defaults to `3000`.
         */
        port: parseInt(process?.env?.PORT, 10) || 3000,

        /**
         * Environment
         *
         * Indicates the current application environment, such as `development`, `production`, 
         * or `test`. This value is retrieved from the environment variable `NODE_ENV`. 
         * If not defined, it defaults to `'development'`.
         */
        environment: process?.env?.NODE_ENV || 'development',

        /**
         * Logging Configuration
         *
         * Determines whether logging is enabled in the application. This value is retrieved 
         * from the environment variable `ENABLE_LOGGING` and is parsed into a boolean. 
         * Defaults to `false` if not defined.
         */
        logging: JSON.parse(process?.env?.ENABLE_LOGGING || 'false'),

        /**
         * API Base Path
         *
         * Specifies the base path for the application's API routes. This value is retrieved 
         * from the environment variable `API_PATH`. If not defined, it defaults to `'/api'`.
         */
        api_path: process?.env?.API_PATH || '/api',
    },
});
