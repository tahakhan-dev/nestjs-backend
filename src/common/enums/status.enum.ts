/**
 * Enum representing the status of API operations.
 * 
 * This enum standardizes the response status for API operations, ensuring a consistent
 * way to communicate the outcome of API requests throughout the application.
 * 
 * Values:
 * - `SUCCESS`: Indicates that the API operation was successful. Typically used when a request is processed without errors.
 * - `FAILED`: Indicates that the API operation failed. Typically used when a request encounters an error or cannot be processed.
 * 
 * Usage:
 * - Use `Status.SUCCESS` for successful API responses.
 * - Use `Status.FAILED` for unsuccessful API responses.
 * 
 * Example:
 * ```typescript
 * const response = {
 *   status: Status.SUCCESS,
 *   data: { message: 'Operation completed successfully.' }
 * };
 * ```
 */
export enum Status {  
    SUCCESS = 1,   // Indicates the API operation was successful
    FAILED = 0,    // Indicates the API operation failed
}
