import { HealthCheckService, HealthCheck, TypeOrmHealthIndicator, HealthCheckResult } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';


/**
 * HealthService
 *
 * This service is responsible for performing health checks for the application.
 * It uses the `HealthCheckService` provided by the `@nestjs/terminus` package to
 * orchestrate various health checks, such as database connectivity and other service statuses.
 */
@Injectable()
export class HealthService {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly dbIndicator: TypeOrmHealthIndicator, // Example: Database health check
    ) { }

    @HealthCheck()
    async checkHealth(): Promise<HealthCheckResult> {
        return this.healthCheckService.check([
            async () =>
                this.dbIndicator.pingCheck('database', { timeout: 1500 }), // Checks database connectivity
        ]);
    }
}
