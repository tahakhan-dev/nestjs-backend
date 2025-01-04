/**
 * Redis Configuration
 *
 * This module centralizes the configuration settings for the Redis service used in the application.
 * It defines critical details such as the Redis host and port, enabling flexible and consistent 
 * configuration across different environments (e.g., development, production).
 */

import { RedisConfig } from "./config.interface";

export default (): { redis: RedisConfig } => ({
    redis: {
        /**
         * Redis Host
         *
         * Specifies the hostname or IP address of the Redis server. 
         * This value is retrieved from the `REDIS_HOST` environment variable. 
         * If not provided, it defaults to `'localhost'`.
         */
        host: process.env.REDIS_HOST || 'localhost',

        /**
         * Redis Port
         *
         * Defines the port number on which the Redis server is running. 
         * This value is retrieved from the `REDIS_PORT` environment variable. 
         * If not specified, it defaults to `6379`, the standard Redis port.
         */
        port: Number(process.env.REDIS_PORT) || 6379,
    }
});
