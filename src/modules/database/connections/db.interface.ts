import { DataSourceOptions } from 'typeorm';

/**
 * Database Configuration Interface
 *
 * This interface defines the structure for specifying database configuration options
 * used by TypeORM. It primarily includes the `entities` property, which allows the
 * application to define the database entities (models) that TypeORM will use.
 *
 * The connection details such as host, port, username, password, and database name
 * are not included here but are expected to be provided through environment variables
 * or the application's main configuration service.
 */
export interface DbConfig {
    entities: DataSourceOptions['entities'];
}
