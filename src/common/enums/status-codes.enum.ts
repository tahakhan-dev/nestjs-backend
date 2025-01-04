/**
 * Enum representing standard HTTP status codes used for API responses.
 * 
 * This enum organizes HTTP status codes into categories for easier reference and usage in applications.
 * Each status code is accompanied by a brief description of its purpose.
 * 
 * Categories:
 * - `2xx` (Successful): Indicate that the request was successfully received, understood, and accepted.
 * - `3xx` (Redirection): Indicate that further action must be taken to complete the request.
 * - `4xx` (Client Error): Indicate that the client made an error in the request.
 * - `5xx` (Server Error): Indicate that the server encountered an error while processing the request.
 * 
 * Usage:
 * - Use this enum in API responses to standardize status codes.
 * - Provide meaningful error messages based on the status codes.
 * 
 * Example:
 * ```typescript
 * return res.status(StatusCodes.NOT_FOUND).json({ error: "Resource not found" });
 * ```
 */
export enum StatusCodes {

    //---------- 2xx (Successful):
    SUCCESS = 200,                          // The request has succeeded.
    CREATED = 201,                          // The request has been fulfilled, and a new resource has been created.
    ACCEPTED = 202,                         // The request has been accepted for processing, but not yet completed.
    NON_AUTHORITATIVE_INFORMATION = 203,    // The response is from a source other than the original server.
    NON_CONTENT = 204,                      // The request succeeded, but no content is returned.
    RESET_CONTENT = 205,                    // The user agent should reset the document view.
    PARTIAL_CONTENT = 206,                  // The server fulfilled a partial GET request.
    MULTI_STATUS = 207,                     // WebDAV: Response contains an XML message for multiple statuses.
    ALREADY_REPORTED = 208,                 // WebDAV: Members of a binding have already been enumerated.
    IM_USED = 226,                          // The response represents a result of instance manipulations.

    //---------- 3xx (Redirection):
    MULTIPLE_CHOICES = 300,                 // Multiple representations of the resource exist.
    MOVED_PERMANENTLY = 301,                // The resource has been permanently moved to a new URI.
    FOUND = 302,                            // The resource temporarily resides under a different URI.
    SEE_OTHER = 303,                        // The resource can be found under a different URI.
    NOT_MODIFIED = 304,                     // The resource has not been modified since last accessed.
    USE_PROXY = 305,                        // The resource must be accessed via a proxy.
    TEMPORARY_REDIRECT = 307,               // Temporary redirection to another URI.
    PERMANENT_REDIRECT = 308,               // Permanent redirection to another URI.

    //---------- 4xx (Client Error):
    BAD_REQUEST = 400,                      // The server could not understand the request due to invalid syntax.
    UNAUTHORIZED = 401,                     // The client must authenticate to access the resource.
    PAYMENT_REQUIRED = 402,                 // Reserved for future use.
    FORBIDDEN = 403,                        // The client is not authorized to access the resource.
    NOT_FOUND = 404,                        // The server cannot find the requested resource.
    METHOD_NOT_ALLOWED = 405,               // The request method is not allowed for the resource.
    NOT_ACCEPTABLE = 406,                   // The requested resource cannot generate acceptable content.
    PROXY_AUTHENTICATION_REQUIRED = 407,    // The client must authenticate with the proxy.
    REQUEST_TIMEOUT = 408,                  // The server timed out waiting for the request.
    CONFLICT = 409,                         // The request conflicts with the current state of the resource.
    GONE = 410,                             // The requested resource is no longer available.
    LENGTH_REQUIRED = 411,                  // The server requires a valid Content-Length header.
    PRECONDITION_FAILED = 412,              // Preconditions in request headers failed validation.
    PAYLOAD_TOO_LARGE = 413,                // The request entity is too large to process.
    URI_TOO_LONG = 414,                     // The request URI is too long for the server to process.
    UNSUPPORTED_MEDIA_TYPE = 415,           // The server cannot process the media type of the request.
    RANGE_NOT_SATISFIABLE = 416,            // The requested range is not satisfiable.
    EXPECTATION_FAILED = 417,               // The expectation in the Expect header could not be fulfilled.
    MISDIRECTED_REQUEST = 421,              // The server cannot produce a response for the request.
    UNPROCESSABLE_ENTITY = 422,             // The request is syntactically correct but cannot be processed.
    LOCKED = 423,                           // The resource is locked.
    FAILED_DEPENDENCY = 424,                // A dependency for the request failed.
    TOO_EARLY = 425,                        // The server is unwilling to process the request early.
    UPGRADE_REQUIRED = 426,                 // The client must upgrade the protocol to proceed.
    PRECONDITION_REQUIRED = 428,            // The server requires a conditional request.
    TOO_MANY_REQUESTS = 429,                // The user sent too many requests in a given timeframe.
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,  // Request headers are too large for the server to process.
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,    // Access to the resource is restricted due to legal reasons.

    //---------- 5xx (Server Error):
    INTERNAL_SERVER_ERROR = 500,            // The server encountered an unexpected condition.
    NOT_IMPLEMENTED = 501,                  // The server does not support the request's functionality.
    BAD_GATEWAY = 502,                      // The server received an invalid response from an upstream server.
    SERVICE_UNAVAILABLE = 503,              // The server is temporarily unavailable due to overload or maintenance.
    GATEWAY_TIMEOUT = 504,                  // The upstream server did not respond in time.
    HTTP_VERSION_NOT_SUPPORTED = 505,       // The HTTP protocol version is not supported.
    VARIANT_ALSO_NEGOTIATES = 506,          // Transparent content negotiation caused an internal error.
    INSUFFICIENT_STORAGE = 507,             // The server lacks storage to complete the request.
    LOOP_DETECTED = 508,                    // The server detected an infinite loop while processing the request.
    NOT_EXTENDED = 510,                     // The request requires further extensions not supported by the server.
    NETWORK_AUTHENTICATION_REQUIRED = 511   // The client must authenticate to access the network.
}
