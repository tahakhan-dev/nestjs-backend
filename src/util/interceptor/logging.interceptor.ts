import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, Inject } from '@nestjs/common';
import { LoggingFunctions } from './activityLogging/activity-logging.function';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/**
 * LoggingInterceptor
 *
 * This interceptor is responsible for logging details of each HTTP request and response
 * in the application. It uses `LoggingFunctions` to handle activity logging and captures
 * both successful responses and errors. The interceptor also logs the time taken to process
 * each request.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * Logger Instance
   *
   * Provides a scoped logger for the `LoggingInterceptor` to log activity and errors.
   */
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Constructor
   *
   * Injects the `LoggingFunctions` service, which is used for handling activity logging.
   *
   * @param {LoggingFunctions} loggingFunctions - The service responsible for publishing activity log events.
   */
  constructor(
    @Inject(LoggingFunctions) private readonly loggingFunctions: LoggingFunctions,
  ) { }

  /**
   * Intercept Method
   *
   * This method intercepts every HTTP request handled by the application, captures request and response
   * details, and logs them. It also calculates the time taken to process the request.
   *
   * @param {ExecutionContext} context - Provides details about the current execution context, including request and response objects.
   * @param {CallHandler} next - The next handler in the request lifecycle, which processes the route logic.
   * @returns {Observable<any>} - The observable that handles the request-response lifecycle.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Extract request details
    const request = context?.switchToHttp()?.getRequest();
    const userAgent = request?.get('user-agent') || '';
    const { ip, method, path: url, body, query, params } = request;

    // Extract response details
    const response = context?.switchToHttp()?.getResponse();
    const invokationController = context?.getClass()?.name; // Name of the controller
    const invokationMethod = context?.getClass()?.name; // Name of the method
    const invokationUserAgent = userAgent; // User-agent string
    const invokationRestMethod = method; // HTTP method (GET, POST, etc.)
    const invokationApiUrl = url; // Request URL
    const invokationIp = ip; // Client IP address

    // Start timing
    const now = Date.now();

    return next?.handle()?.pipe(
      /**
       * Tap Operator
       *
       * Executes a side effect when the response is successfully processed. Logs the response time
       * and publishes an activity log using `LoggingFunctions`.
       *
       * @param {any} res - The response returned by the route handler.
       */
      tap((res) => {
        this.logger.log(`After... ${Date.now() - now}ms`);
        const { statusCode } = response;
        this.loggingFunctions.activityLogHandler(
          request,
          body,
          query,
          params,
          response,
          invokationRestMethod,
          invokationApiUrl,
          invokationIp,
          invokationUserAgent,
          invokationController,
          invokationMethod,
          `After... ${Date.now() - now}ms`,
          statusCode,
        );
      }),

      /**
       * CatchError Operator
       *
       * Executes when an error occurs during request processing. Logs the error details
       * and publishes an activity log with the error message and response status.
       *
       * @param {Error} err - The error object representing the failure.
       * @returns {Observable<never>} - Rethrows the error for further handling.
       */
      catchError((err) => {
        const { statusCode } = response;
        this.loggingFunctions.activityLogHandler(
          request,
          body,
          query,
          params,
          response,
          invokationRestMethod,
          invokationApiUrl,
          invokationIp,
          invokationUserAgent,
          invokationController,
          invokationMethod,
          `After... ${Date.now() - now}ms -${err}`,
          statusCode,
        );
        this.logger.error(err);
        return throwError(() => err); // Rethrow the error
      }),
    );
  }
}
