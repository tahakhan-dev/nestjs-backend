export interface AppConfig {
    /**
     * Application Version
     *
     * Represents the current version of the application (e.g., "1.0.0"). 
     * This is used to track and manage application updates, ensuring compatibility 
     * and proper versioning for deployments and API consumers.
     */
    version: string;

    /**
     * API Versioning Header Key
     *
     * Specifies the custom HTTP header key used for API versioning (e.g., "X-API-Version"). 
     * This enables version-specific routing and supports backward compatibility for API clients.
     */
    headerKey: string;

    /**
     * Application Listening Port
     *
     * Defines the port on which the application listens for incoming requests (e.g., 3000). 
     * This is essential for configuring network communication and service accessibility.
     */
    port: number;

    /**
     * Runtime Environment
     *
     * Specifies the current runtime environment of the application, such as "development", 
     * "production", or "test". This determines the behavior and configuration of the application 
     * based on its deployment context.
     */
    environment: string;

    /**
     * Logging Configuration
     *
     * Indicates whether logging is enabled (`true`) or disabled (`false`) in the application. 
     * This helps in managing log outputs for debugging and monitoring.
     */
    logging: boolean;

    /**
     * API Base Path
     *
     * Defines the base path for the API routes in the application (e.g., "/api"). 
     * This allows consistent routing and can be customized for different deployments.
     */
    api_path: string;
}

export interface RedisConfig {
    /**
     * Redis Host
     *
     * Specifies the hostname or IP address of the Redis server. 
     * This is used for connecting to the Redis instance for caching, session management, etc.
     */
    host: string;

    /**
     * Redis Port
     *
     * Defines the port number on which the Redis server is running (e.g., 6379). 
     * This is required for establishing the connection to the Redis instance.
     */
    port: number;
}

export interface Config {
    /**
     * Application Configuration
     *
     * Contains all application-level settings, including versioning, environment, 
     * ports, logging, and API paths. These settings are central to the application's behavior.
     */
    app: AppConfig;

    /**
     * Redis Configuration
     *
     * Defines the connection details for the Redis server, such as host and port. 
     * Redis is typically used for caching, message brokering, or session management.
     */
    redis: RedisConfig;
}
