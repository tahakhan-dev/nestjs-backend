import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeSystemConstants, SYSTEM_CONSTANT } from './config/system-constants';
import helmet from 'helmet';
import * as cors from 'cors';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  try {
    // Initialize a logger instance with a custom context label
    const logger = new Logger('Backend-Test-Service');

    // Check if logging is enabled based on the environment variable 'ENABLE_LOGGING'
    const enableLogging = process.env.ENABLE_LOGGING === 'true'


    // Create a new NestJS application instance with custom logging options
    // If logging is enabled, allow all log levels; otherwise, disable logging
    const app = await NestFactory.create(AppModule, {
      logger: enableLogging ? ['log', 'error', 'warn', 'debug', 'verbose'] : false, // Disable logging entirely
    });

    if (enableLogging) {
      logger.log('Logging is enabled'); // Message logged when logging is active
    } else {
      logger.warn('Logging is disabled'); // Warning message when logging is inactive
    }


    // Enable CORS for cross-origin requests
    app.use(cors());

    // Enable Helmet for basic security headers
    app.use(helmet());

    // Retrieve ConfigService to access application configurations
    const configService = app.get(ConfigService);


    // Initialize system constants to be globally accessible
    initializeSystemConstants(configService);


    // Enable API versioning using custom headers
    app.enableVersioning({
      type: VersioningType.HEADER,
      header: `${configService.get<number>('app.headerKey')}`, // The header used to specify the API version
    });

    // Apply global validation pipes
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Automatically transform request payloads to match DTO types.
        whitelist: true, // Remove non-decorated properties from the payload.
        forbidNonWhitelisted: true, // Throw an error if non-decorated properties are included.
      }),
    );

    // Set a global prefix for all routes
    app.setGlobalPrefix(SYSTEM_CONSTANT.API_PATH);

    // Enable automatic handling of shutdown signals (e.g., SIGINT, SIGTERM)
    app.enableShutdownHooks();

    // Start the application and listen on the configured port
    await app.listen(configService.get<number>('app.port'), () => {
      console.log(`Backend Test Service is running on port ${configService.get<number>('app.port')}`);
    });

    // Graceful shutdown handlers
    process.on('SIGINT', async () => {
      console.log('SIGINT signal received. Closing HTTP server...');
      await app.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received. Closing HTTP server...');
      await app.close();
      process.exit(0);
    });


  } catch (error) {
    console.log(error, 'Bootstrap Error');
  }
}
bootstrap();
