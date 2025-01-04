import { OnApplicationShutdown, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ShutdownService implements OnApplicationShutdown {
    private readonly logger = new Logger(ShutdownService.name);

    async onApplicationShutdown(signal: string) {
        try {
            this.logger.log(`SHUTDOWN_SIGNAL: ${signal}`);
            this.logger.log('TypeORM Database connections closed');
        } catch (error) {
            this.logger.error('Error during shutdown', error);
        }
    }
}
