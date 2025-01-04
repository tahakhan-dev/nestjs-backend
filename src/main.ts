import { initializeSystemConstants, SYSTEM_CONSTANT } from './config/system-constants';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cors from 'cors';

/**
 * Bootstrap Function
 *
 * This function initializes and starts the NestJS application. It configures middleware, logging,
 * CORS, security, API versioning, and global settings. It also ensures proper handling of
 * application shutdown signals and starts the server on the configured port.
 */
async function bootstrap() {
  // Initialize a logger instance with a custom context label
  const logger = new Logger('Backend-Test-Service');
  try {
    /**
     * Enable Logging
     *
     * Determines if logging is enabled based on the `ENABLE_LOGGING` environment variable.
     * Logs a message indicating whether logging is active or disabled.
     */
    const enableLogging = process.env.ENABLE_LOGGING === 'true';

    // Create a new NestJS application with custom logging options
    const app = await NestFactory.create(AppModule, {
      logger: enableLogging
        ? ['log', 'error', 'warn', 'debug', 'verbose'] // Enable all log levels if logging is active
        : false, // Disable logging entirely
    });

    // Log the logging status
    if (enableLogging) {
      logger.log('Logging is enabled');
    } else {
      logger.warn('Logging is disabled');
    }

    /**
     * CORS Configuration
     *
     * Enables Cross-Origin Resource Sharing (CORS) for the application to allow
     * requests from different origins.
     */
    app.use(cors());

    /**
     * Security Headers
     *
     * Enables Helmet middleware to add basic security headers to the application,
     * mitigating common security risks.
     */
    app.use(helmet());

    /**
     * Configuration Service
     *
     * Retrieves the ConfigService to access application configurations.
     */
    const configService = app.get(ConfigService);

    /**
     * System Constants Initialization
     *
     * Initializes globally accessible system constants using the `initializeSystemConstants` function.
     */
    initializeSystemConstants(configService);

    /**
     * API Versioning
     *
     * Enables API versioning using custom headers. The header used to specify the version
     * is retrieved from the application's configuration.
     */
    app.enableVersioning({
      type: VersioningType.HEADER, // Use header-based versioning
      header: `${configService.get<string>('app.headerKey')}`, // Custom header for versioning
    });

    /**
     * Global Validation Pipes
     *
     * Applies global validation pipes to ensure that incoming requests match the DTO structure.
     * - `transform`: Automatically converts payloads to match DTO types.
     * - `whitelist`: Removes properties not explicitly decorated in the DTO.
     * - `forbidNonWhitelisted`: Throws an error if non-whitelisted properties are included.
     */
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    /**
     * Global Route Prefix
     *
     * Sets a global prefix for all routes in the application. The prefix is retrieved
     * from the `SYSTEM_CONSTANT` configuration.
     */
    app.setGlobalPrefix(SYSTEM_CONSTANT.API_PATH);

    /**
     * Shutdown Hooks
     *
     * Enables automatic handling of application shutdown signals (e.g., SIGINT, SIGTERM),
     * ensuring a clean and graceful shutdown.
     */
    app.enableShutdownHooks();

    /**
     * Start Application
     *
     * Starts the application and listens on the configured port. Logs a message indicating
     * the successful start of the server and the port it is running on.
     */
    await app.listen(configService.get<number>('app.port'), () => {
      logger.log(`Backend Test Service is running on port ${configService.get<number>('app.port')}`);
    });
  } catch (error) {
    /**
     * Error Handling
     *
     * Logs an error message if the application fails to start.
     */
    logger.error(`Error starting the application: ${error}`);
  }
}

bootstrap();
