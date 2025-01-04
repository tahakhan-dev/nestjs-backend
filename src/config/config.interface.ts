export interface AppConfig {
    /**
     * The current version of the application (e.g., "1.0.0").
     * Used to track and manage application updates.
     */
    version: string;

    /**
     * The header key used for API versioning (e.g., "X-API-Version").
     * Enables version-specific routing and backward compatibility.
     */
    headerKey: string;

    /**
     * The port on which the application listens for incoming requests (e.g., 3000).
     */
    port: number;

    /**
     * The current runtime environment of the application (e.g., "development", "production").
     * Determines the behavior and configuration of the application based on its deployment context.
     */
    environment: string;

    logging: boolean;

    api_path: string;
}

export interface Config {
    /**
     * Application-level settings, including versioning, environment, and encryption.
     */
    app: AppConfig;

}