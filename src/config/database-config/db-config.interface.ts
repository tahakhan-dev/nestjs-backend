/**
 * Database Connection Configuration Interface
 *
 * Defines the structure for the configuration details required to establish
 * a connection to the database. This interface includes credentials, host
 * details, connection options, and optional settings for advanced configurations.
 */
export interface ConfigDBData {
    /**
     * Database Type
     *
     * Specifies the type of database being used (e.g., 'postgres', 'mysql', 'sqlite').
     * The value is typically dependent on the ORM or database driver being used.
     */
    type: any;

    /**
     * Database User
     *
     * The username for authenticating the database connection.
     */
    user: string;

    /**
     * Database Password
     *
     * The password for authenticating the database connection.
     */
    pass: string;

    /**
     * Database Name
     *
     * The name of the database to which the application connects.
     */
    name: string;

    /**
     * Database Host
     *
     * Specifies the hostname or IP address of the database server.
     */
    host: string;

    /**
     * Database Port
     *
     * The port number on which the database server is running.
     */
    port: number;

    /**
     * Connection Pool Size
     *
     * Specifies the maximum number of connections allowed in the connection pool.
     * This setting is used for optimizing database performance.
     */
    poolSize: number;

    /**
     * Synchronize Database Schema
     *
     * Indicates whether the ORM should automatically synchronize the database schema
     * with the application's entity definitions. This is typically used during
     * development but should be disabled in production.
     */
    synchronize: boolean;

    /**
     * Auto Load Entities
     *
     * If set to `true`, entities will be automatically loaded by the ORM.
     * This setting is optional and can be omitted if entities are manually configured.
     */
    autoLoadEntities?: boolean;

    /**
     * Database Dialect
     *
     * Specifies the dialect or flavor of SQL used by the database (e.g., 'utf8mb4').
     * This is an optional setting and depends on the database type.
     */
    dialect?: string;

    /**
     * Database Character Set
     *
     * Defines the character set used by the database. This setting is optional
     * and may be configured based on application requirements.
     */
    charset?: string;

    /**
     * Database Collation
     *
     * Specifies the collation setting for the database, which determines how
     * string comparison and sorting are performed.
     */
    collate?: string;
}

/**
 * Application Database Configuration Interface
 *
 * Defines the structure for the overall configuration settings related to the
 * application's database and runtime environment. This interface includes
 * database connection details, environment settings, and logging preferences.
 */
export interface DbConfigData {
    /**
     * Application Environment
     *
     * Specifies the current runtime environment of the application (e.g., 'development', 'production').
     */
    env: string;

    /**
     * HTTP Server Port
     *
     * The port number on which the HTTP server listens for incoming requests.
     * This property is optional and may be omitted in certain configurations.
     */
    port?: number;

    /**
     * Database Connection Details
     *
     * Provides detailed configuration for connecting to the database, including
     * credentials, host information, and optional advanced settings.
     */
    db?: ConfigDBData;

    /**
     * Logging Level
     *
     * Specifies the level of logging used by the application.
     * Common examples include 'verbose', 'info', 'warn', and 'error'.
     * 
     * @example 'verbose', 'info', 'warn', 'error'
     */
    logLevel: string;
}
