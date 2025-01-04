/**
 * ConfigAppModule
 * 
 * This module centralizes the application's configuration by integrating various configuration sources.
 * It leverages the NestJS `ConfigModule` to load and validate environment-specific settings dynamically.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { configValidationSchema } from './config.validation';
import { Config } from './config.interface';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the ConfigModule global, so it can be used throughout the application without re-importing
            load: [
                appConfig,              // Application-level configurations
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
     * Returns a structured configuration object combining all configuration sources.
     * 
     * This method centralizes the application's settings into a single object for easy access.
     * 
     * @returns {Config} The aggregated configuration object
     */
    getConfig(): Config {
        return {
            app: appConfig().app,                                 // Application configuration
        };
    }
}
