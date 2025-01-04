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


export interface ILoggerMapper {
    consumerId: string,
    body?: string,
    params?: string,
    query?: string,
    invokationRestMethod: string,
    invokationApiUrl: string,
    invokationIp: string,
    invokationUserAgent: string,
    invokationController: string
    invokationMethod: string
    apiMessage?: string;
    completionTime: string,
    statusCode: number
}