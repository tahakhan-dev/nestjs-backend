import { StatusCodes } from "../enums/status-codes.enum";
import { Status } from "../enums/status.enum";

/**
 * A standardized interface for API responses.
 * 
 * This interface ensures that all API responses conform to a consistent structure,
 * making it easier to handle both success and error cases in a predictable way.
 * It is also generic, allowing the result to adapt to the specific type of data
 * being returned by the API.
 * 
 * @template T - The type of the `result` field. Defaults to `any` if no type is provided.
 */
export interface ApiResponse<T = any> {
    /**
     * The HTTP status code of the API response.
     * Examples:
     * - 200: OK
     * - 400: Bad Request
     * - 500: Internal Server Error
     */
    statusCode: StatusCodes;

    /**
     * Indicates whether the API call was successful or not.
     * Typically represented by an enum, `Status` may include values such as:
     * - SUCCESS
     * - FAILURE
     */
    status: Status;

    /**
     * The result of the API call.
     * Contains the data returned by the API if the call is successful.
     * Can be of any type, nullable, or undefined if no meaningful result is present.
     * Examples:
     * - A user object for a user-related API: `{ id: 1, name: "Taha Khan" }`
     * - `null` for error cases where no data is returned.
     */
    result?: T | null;

    /**
     * An optional message providing additional context or feedback about the API call.
     * Commonly used for human-readable success or error messages.
     * Examples:
     * - "User Login successfully."
     * - "Invalid request payload."
     */
    message?: string;

    /**
     * An optional error message describing the reason for the API failure.
     * Only included when the API call is unsuccessful.
     * Examples:
     * - "Validation failed: Missing required fields."
     * - "Internal server error."
     */
    error?: string;
}


/**
 * Interface representing the structure for logging API invocations.
 * 
 * This interface is designed to capture and store detailed information about
 * API calls for logging and monitoring purposes. It provides a standardized
 * way to track API requests, responses, and related metadata, which can be
 * useful for debugging, auditing, and analytics.
 */
export interface ILoggerMapper {

    /**
     * Optional JSON string representing the body of the request.
     * Captures the payload sent with POST, PUT, or PATCH requests.
     * Example: '{"name": "John Doe", "email": "john@example.com"}'
     */
    body?: string;

    /**
     * Optional JSON string representing the route parameters of the request.
     * Captures dynamic parameters specified in the API endpoint URL.
     * Example: '{"id": "123"}' for an endpoint like `/user/:id`
     */
    params?: string;

    /**
     * Optional JSON string representing the query parameters of the request.
     * Captures the key-value pairs sent as part of the URL query string.
     * Example: '{"search": "keyword", "page": "2"}' for `/api?search=keyword&page=2`
     */
    query?: string;

    /**
     * The HTTP method used for the API request.
     * Examples include: "GET", "POST", "PUT", "DELETE".
     */
    invokationRestMethod: string;

    /**
     * The full URL of the API endpoint that was invoked.
     * Example: "https://api.example.com/v1/users"
     */
    invokationApiUrl: string;

    /**
     * The IP address from which the API call was made.
     * Useful for tracing the origin of the request.
     * Example: "192.168.1.1"
     */
    invokationIp: string;

    /**
     * The User-Agent string of the client making the API call.
     * Provides information about the client application or browser.
     * Example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
     */
    invokationUserAgent: string;

    /**
     * The name of the controller handling the API request.
     * Useful for identifying the specific module or class processing the call.
     * Example: "UserController"
     */
    invokationController: string;

    /**
     * The name of the method in the controller that was invoked.
     * Example: "getUserDetails"
     */
    invokationMethod: string;

    /**
     * The time taken to complete the API call, typically in milliseconds.
     * Useful for monitoring performance and identifying bottlenecks.
     * Example: "125ms"
     */
    completionTime: string;

    /**
     * The HTTP status code returned by the API response.
     * Indicates the success or failure of the API call.
     * Example: 200 for success, 404 for not found, 500 for internal server error.
     */
    statusCode: number;
}