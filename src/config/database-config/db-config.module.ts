import { Module } from '@nestjs/common';
import { ConfigService } from './db-config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useFactory: () => {
                const service = new ConfigService();
                service.loadFromEnvironment(process.env); // Load configurations at runtime
                return service;
            },
        },
    ],
    exports: [ConfigService],
})
export class ConfigDatabaseModule { }
