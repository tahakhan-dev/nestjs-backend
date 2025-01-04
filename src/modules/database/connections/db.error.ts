/**
 * Base Database Error Class
 *
 * This class serves as the base error class for all database-related errors in the application.
 * It extends the native `Error` class and provides a default error message that can be overridden.
 */
export class DbError extends Error {
    /**
     * Constructor
     *
     * Initializes a new instance of the `DbError` class with a custom error message.
     * If no message is provided, a default message `'Unknown database error'` is used.
     *
     * @param {string} message - The error message describing the database error.
     */
    public constructor(message = 'Unknown database error') {
        super(message); // Pass the error message to the base Error class
    }
}

/**
 * Database Configuration Error Class
 *
 * This class represents errors related specifically to database configuration.
 * It extends the `DbError` class, inheriting its properties and behavior while
 * providing a more specific default error message.
 */
export class DbConfigError extends DbError {
    /**
     * Constructor
     *
     * Initializes a new instance of the `DbConfigError` class with a custom error message.
     * If no message is provided, a default message `'Database configuration error'` is used.
     *
     * @param {string} message - The error message describing the configuration issue.
     */
    public constructor(message = 'Database configuration error') {
        super(message); // Pass the error message to the DbError base class
    }
}
