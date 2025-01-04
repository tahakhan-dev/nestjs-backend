import { ConfigDatabaseModule } from "src/config/database-config/db-config.module";
import { ConfigDBData } from "src/config/database-config/db-config.interface";
import { ConfigService } from "src/config/database-config/db-config.service";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DynamicModule, Module } from "@nestjs/common";
import { DataSourceOptions } from "typeorm";
import { DbConfigError } from "./db.error";
import { DbConfig } from "./db.interface";

/**
 * DatabaseModule
 *
 * This module is responsible for setting up and configuring the database connection
 * using TypeORM. It provides a dynamic module with support for asynchronous configuration
 * and custom entities. The module integrates with the application's configuration service
 * to retrieve database settings and establish the connection.
 */
@Module({})
export class DatabaseModule {
    /**
     * forRoot
     *
     * A static method to configure the `DatabaseModule` dynamically. It initializes
     * TypeORM with options derived from the configuration service and the provided
     * `DbConfig`.
     *
     * @param {DbConfig} dbconfig - The database configuration, including custom entities.
     * @returns {DynamicModule} - A dynamic module configured with TypeORM settings.
     */
    static forRoot(dbconfig: DbConfig): DynamicModule {
        try {
            return {
                global: true, // Makes the module available globally in the application
                module: DatabaseModule,
                imports: [
                    TypeOrmModule.forRootAsync({
                        /**
                         * Imports the ConfigDatabaseModule to access the ConfigService.
                         */
                        imports: [ConfigDatabaseModule],

                        /**
                         * Defines a factory function to retrieve database connection options.
                         *
                         * @param {ConfigService} configService - The service to access application configuration.
                         * @returns {TypeOrmModuleOptions} - The database connection options for TypeORM.
                         */
                        useFactory: (
                            configService: ConfigService,
                        ) =>
                            DatabaseModule.getConnectionOptions(
                                configService,
                                dbconfig,
                            ),
                        inject: [ConfigService], // Injects ConfigService as a dependency
                    }),
                ],
            };
        } catch (error) {
            console.error(error, '========DatabaseModule forRoot Function========');
        }
    }

    /**
     * getConnectionOptions
     *
     * A static method to build the TypeORM connection options based on the configuration service
     * and the provided database configuration.
     *
     * @param {ConfigService} config - The configuration service instance.
     * @param {DbConfig} dbconfig - Additional database configuration, such as custom entities.
     * @returns {TypeOrmModuleOptions} - The complete database connection options.
     */
    public static getConnectionOptions(
        config: ConfigService,
        dbconfig: DbConfig,
    ): TypeOrmModuleOptions {
        try {
            const dbdata = config?.getConfig()?.db;

            if (!dbdata) {
                throw new DbConfigError('Database config is missing'); // Throws error if database config is not found
            }

            const connectionOptions = this.getConnectionOptionsDatabase(dbdata);

            return {
                ...connectionOptions,
                entities: dbconfig?.entities, // Adds custom entities provided in the dbconfig
                autoLoadEntities: dbdata.autoLoadEntities, // Enables automatic entity loading
                logging: true, // Enables query logging
            };
        } catch (error) {
            console.error(error, '========DatabaseModule getConnectionOptions Function========');
        }
    }

    /**
     * getConnectionOptionsDatabase
     *
     * A helper method to build the basic database connection options from the `ConfigDBData`.
     *
     * @param {ConfigDBData} dbdata - The database configuration data.
     * @returns {DataSourceOptions} - The core database connection options for TypeORM.
     */
    private static getConnectionOptionsDatabase(dbdata: ConfigDBData): DataSourceOptions {
        try {
            return {
                type: dbdata.type, // Database type (e.g., 'postgres', 'mysql')
                host: dbdata.host, // Database host (e.g., 'localhost', IP address)
                port: dbdata.port, // Database port (e.g., 5432 for PostgreSQL)
                username: dbdata.user, // Username for the database connection
                password: dbdata.pass, // Password for the database connection
                database: dbdata.name, // Database name
                synchronize: dbdata.synchronize, // Schema synchronization flag
                poolSize: dbdata.poolSize, // Connection pool size
            };
        } catch (error) {
            console.error(error, '========DatabaseModule getConnectionOptionsDatabase Function========');
        }
    }
}
