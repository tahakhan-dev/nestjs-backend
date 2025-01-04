/**
 * Application Configuration
 *
 * This module defines the configuration settings for the application, centralizing critical details 
 * such as versioning, ports, security keys, and environment-based settings. 
 * It ensures consistent and flexible configuration across different environments (e.g., development, production).
 */

import { AppConfig } from "./config.interface";




export default (): { app: AppConfig } => ({
    app: {
        /**
       * Application Version
       *
       * The version of the application. Retrieved from the environment variable `APP_VERSION`.
       * Defaults to `'1.0'` if not specified.
       */
        version: process?.env?.APP_VERSION || '1.0',

        /**
         * API Header Key
         *
         * Custom header key used for specifying the API version in requests. 
         * Defaults to `'X-API-Version'`.
         */
        headerKey: 'X-API-Version',

        /**
         * Application Port
         *
         * The port on which the application will run. Retrieved from the environment variable `PORT`.
         * Defaults to `3000` if not specified.
         */
        port: parseInt(process?.env?.PORT, 10) || 3000,

        /**
         * Environment
         *
         * Specifies the current application environment (e.g., `development`, `production`).
         * Retrieved from the environment variable `NODE_ENV`. Defaults to `'development'`.
         */
        environment: process?.env?.NODE_ENV || 'development',

        logging: JSON.parse(process?.env?.ENABLE_LOGGING) || false,

        api_path: process?.env?.API_PATH || '/api',


    },
});


