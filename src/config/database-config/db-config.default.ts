import { DbConfigData } from './db-config.interface';
import 'dotenv/config';

/**
 * Database Configuration Module
 *
 * This module defines the default configuration settings for the database connection.
 * It dynamically retrieves values from environment variables and populates them into a
 * structured configuration object (`DEFAULT_CONFIG`). These settings are used to manage
 * the database connection, including credentials, host details, pool size, and behavior
 * such as automatic entity loading and database synchronization.
 */

// Retrieve database credentials and connection settings from environment variables
const userName = process?.env?.DB_USER;                 // Database username
const Pass = process?.env?.DB_PASSWORD;                 // Database password
const Host = process?.env?.DB_HOST;                     // Database host (e.g., localhost or an IP address)
const dbName = process?.env?.DB_DATABASE;               // Name of the target database
const dbType = process?.env?.DB_TYPE;                   // Type of database (e.g., 'postgres', 'mysql')
const dbPort = process?.env?.DB_PORT;                   // Port number for database connection
const poolSize = +process?.env?.POOL_SIZE;              // Maximum number of connections in the pool
const enable_db_creation = JSON.parse(process?.env?.ENABLE_AUTOMATIC_CREATION); // Enable automatic database schema creation
const auto_load_entities = JSON.parse(process?.env?.AUTO_LOAD_ENTITIES);        // Enable automatic loading of database entities

/**
 * Default Database Configuration
 *
 * The `DEFAULT_CONFIG` object defines the database settings used in the application. 
 * These settings are typically loaded during the application initialization process 
 * and provide a centralized way to configure database connection behavior.
 */
export const DEFAULT_CONFIG: DbConfigData = {
    /**
     * Environment
     *
     * Specifies the current environment in which the application is running.
     * Default is set to `'DEVELOPMENT'`. This can be adjusted based on deployment needs.
     */
    env: 'DEVELOPMENT',

    db: {
        /**
         * Database Type
         *
         * Specifies the type of database to connect to (e.g., 'postgres', 'mysql').
         * This value is retrieved from the `DB_TYPE` environment variable.
         */
        type: dbType,

        /**
         * Database Host
         *
         * Defines the hostname or IP address of the database server.
         * This value is retrieved from the `DB_HOST` environment variable.
         */
        host: Host,

        /**
         * Database Name
         *
         * Specifies the name of the database to connect to.
         * This value is retrieved from the `DB_DATABASE` environment variable.
         */
        name: dbName,

        /**
         * Database User
         *
         * The username used for authenticating the database connection.
         * This value is retrieved from the `DB_USER` environment variable.
         */
        user: userName,

        /**
         * Database Password
         *
         * The password used for authenticating the database connection.
         * This value is retrieved from the `DB_PASSWORD` environment variable.
         */
        pass: Pass,

        /**
         * Database Port
         *
         * The port number on which the database server is running.
         * This value is retrieved from the `DB_PORT` environment variable.
         */
        port: +dbPort,

        /**
         * Synchronize Database Schema
         *
         * Indicates whether the database schema should be automatically created or updated.
         * This is controlled by the `ENABLE_AUTOMATIC_CREATION` environment variable.
         */
        synchronize: enable_db_creation,

        /**
         * Connection Pool Size
         *
         * Specifies the maximum number of connections allowed in the database connection pool.
         * This value is retrieved from the `POOL_SIZE` environment variable.
         */
        poolSize: poolSize,

        /**
         * Auto Load Entities
         *
         * Indicates whether database entities should be automatically loaded by the ORM.
         * This is controlled by the `AUTO_LOAD_ENTITIES` environment variable.
         */
        autoLoadEntities: auto_load_entities,
    },

    /**
     * Log Level
     *
     * Specifies the default logging level for database operations. 
     * Default value is set to `'info'`.
     */
    logLevel: 'info',
};
