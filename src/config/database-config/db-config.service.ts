import { Injectable } from '@nestjs/common';
import { DbConfigData, ConfigDBData } from './db-config.interface';
import { DEFAULT_CONFIG } from './db-config.default';

@Injectable()
export class ConfigService {
    private readonly config: DbConfigData;

    constructor() {
        this.config = DEFAULT_CONFIG; // Initialize with defaults
    }

    public loadFromEnvironment(env: Record<string, any>): void {
        this.config.env = env.NODE_ENV || DEFAULT_CONFIG.env;
        this.config.port = env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port;
        this.config.db = {
            type: env.DB_TYPE || DEFAULT_CONFIG.db.type,
            user: env.DB_USER || DEFAULT_CONFIG.db.user,
            pass: env.DB_PASSWORD || DEFAULT_CONFIG.db.pass,
            name: env.DB_DATABASE || DEFAULT_CONFIG.db.name,
            host: env.DB_HOST || DEFAULT_CONFIG.db.host,
            port: env.DB_PORT ? parseInt(env.DB_PORT, 10) : DEFAULT_CONFIG.db.port,
            poolSize: env.POOL_SIZE ? parseInt(env.POOL_SIZE, 10) : DEFAULT_CONFIG.db.poolSize,
            synchronize: env.ENABLE_AUTOMATIC_CREATION ? JSON.parse(env.ENABLE_AUTOMATIC_CREATION) : DEFAULT_CONFIG.db.synchronize,
            autoLoadEntities: env.AUTO_LOAD_ENTITIES ? JSON.parse(env.AUTO_LOAD_ENTITIES) : DEFAULT_CONFIG.db.autoLoadEntities,
            dialect: env.DB_DIALECT || DEFAULT_CONFIG.db.dialect,
            charset: env.DB_CHARSET || DEFAULT_CONFIG.db.charset,
            collate: env.DB_COLLATE || DEFAULT_CONFIG.db.collate,
        };
        this.config.logLevel = env.LOG_LEVEL || DEFAULT_CONFIG.logLevel;
    }

    public getConfig(): DbConfigData {
        return this.config;
    }
}
