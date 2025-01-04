import { HealthCheckResult } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }


    /**
     * Health Check Endpoint
     *
     * This endpoint returns the application's current health status.
     * It calls the `checkHealth` method of the `HealthService`, which
     * performs various checks (e.g., database connection, memory usage).
     *
     * @returns {Promise<HealthCheckResult>} - A promise that resolves to a `HealthCheckResult` object,
     *                                         containing the health status and details of the checks.
     *
     * @example
     * GET /health
     * {
     *   "status": "ok",
     *   "details": {
     *     "database": { "status": "up" },
     *     "memory": { "status": "up" }
     *   }
     * }
     */
    @Get()
    async getHealthCheck(): Promise<HealthCheckResult> {
        return this.healthService.checkHealth();
    }
}
