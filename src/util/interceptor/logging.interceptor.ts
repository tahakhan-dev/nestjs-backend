import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, Inject } from '@nestjs/common';
import { LoggingFunctions } from './activityLogging/activity-logging.function';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(
    @Inject(LoggingFunctions) private readonly loggingFunctions: LoggingFunctions,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context?.switchToHttp()?.getRequest();
    const userAgent = request?.get('user-agent') || '';
    const { ip, method, path: url, body, query, params } = request;

    const response = context?.switchToHttp()?.getResponse();
    const invokationController = context?.getClass()?.name;
    const invokationMethod = context?.getClass()?.name;
    const invokationUserAgent = userAgent
    const invokationRestMethod = method
    const invokationApiUrl = url
    const invokationIp = ip


    const now = Date.now();
    return next?.handle()?.pipe( // next.handle which essentially will execute our route handler 
      tap((res) => { // tap is just a side effect operator which will allow us to actually get access to the response of the route handler
        this.logger.log(`After... ${Date.now() - now}ms`)
        const { statusCode } = response;
        this.loggingFunctions.activityLogHandler(request, body, query, params, response, invokationRestMethod, invokationApiUrl, invokationIp, invokationUserAgent, invokationController, invokationMethod, `After... ${Date.now() - now}ms`, statusCode);
      }),
      catchError((err) => {
        const { statusCode } = response;
        this.loggingFunctions.activityLogHandler(request, body, query, params, response, invokationRestMethod, invokationApiUrl, invokationIp, invokationUserAgent, invokationController, invokationMethod, `After... ${Date.now() - now}ms -${err}`, statusCode);
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}
