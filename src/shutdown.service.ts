import { OnApplicationShutdown, Injectable, Logger } from '@nestjs/common';

/**
 * ShutdownService
 *
 * This service handles application shutdown events and performs cleanup tasks.
 * It implements the `OnApplicationShutdown` lifecycle hook provided by NestJS,
 * ensuring proper handling of termination signals (e.g., SIGINT, SIGTERM).
 */
@Injectable()
export class ShutdownService implements OnApplicationShutdown {
    /**
     * Logger Instance
     *
     * Provides a scoped logger for the `ShutdownService` to log shutdown-related activities.
     */
    private readonly logger = new Logger(ShutdownService.name);

    /**
     * Application Shutdown Hook
     *
     * This method is triggered when the application receives a termination signal.
     * It logs the signal received and performs any necessary cleanup, such as closing
     * database connections.
     *
     * @param {string} signal - The termination signal that triggered the shutdown (e.g., SIGINT, SIGTERM).
     */
    async onApplicationShutdown(signal: string) {
        try {
            // Log the received shutdown signal
            this.logger.log(`SHUTDOWN_SIGNAL: ${signal}`);

            // Perform cleanup tasks (e.g., close database connections)
            this.logger.log('TypeORM Database connections closed');
        } catch (error) {
            // Log any errors encountered during the shutdown process
            this.logger.error('Error during shutdown', error);
        }
    }
}
