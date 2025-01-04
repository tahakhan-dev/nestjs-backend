import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // For database health check
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TerminusModule,  // Provides health-check utilities
        TypeOrmModule,   // Import if database health checks are needed
    ],
    controllers: [HealthController],
    providers: [HealthService],
})
export class HealthModule { }
