/**
 * ConfigAppModule
 * 
 * This module centralizes the application's configuration by integrating various configuration sources.
 * It leverages the NestJS `ConfigModule` to load and validate environment-specific settings dynamically.
 */

import { configValidationSchema } from './config.validation';
import { ConfigModule } from '@nestjs/config';
import { Config } from './config.interface';
import { Module } from '@nestjs/common';
import appConfig from './app.config';
import redis from './redis.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the ConfigModule global, so it can be used throughout the application without re-importing
            load: [
                appConfig,              // Application-level configurations
                redis
            ],
            validationSchema: configValidationSchema, // Validates environment variables using a Joi schema
            validationOptions: {
                abortEarly: true, // Stops validation upon encountering the first error
                allowUnknown: true, // Allows unknown environment variables, preventing validation failures
            },
        }),
    ],
})
export class ConfigAppModule {
    /**
     * Retrieves the Aggregated Configuration Object
     *
     * Combines all configuration sources into a single structured object (`Config`) 
     * for easy and centralized access across the application.
     *
     * @returns {Config} The combined configuration object containing `app` and `redis` settings.
     */
    getConfig(): Config {
        return {
            app: appConfig().app, // Retrieves application-level configurations
            redis: redis().redis, // Retrieves Redis-related configurations
        };
    }
}
