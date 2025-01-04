
import { ActivityLogEvent } from "src/modules/users/events/activity-log-event.event";
import { ILoggerMapper } from "src/common/interface/api-response";
import { Inject, Injectable } from "@nestjs/common"
import { EventBus } from "@nestjs/cqrs";
import { Request } from 'express';


/**
 * LoggingFunctions
 *
 * This service provides logging-related functionalities, specifically handling activity logging.
 * It publishes activity log events to the NestJS CQRS `EventBus`, allowing other parts of the
 * application to respond to these events (e.g., saving logs, monitoring).
 */
@Injectable()
export class LoggingFunctions {  // class related to logging function 
    constructor(
        @Inject(EventBus) private readonly eventBus: EventBus,
    ) { }

    /**
     * Activity Log Handler
     *
     * Constructs an `ILoggerMapper` object with detailed information about the HTTP request,
     * including the method, URL, headers, body, query, parameters, and other metadata.
     * It then publishes an `ActivityLogEvent` to the `EventBus`, which can be processed by
     * event handlers to record or analyze activity logs.
     *
     * @param {Request} request - The Express.js request object containing the original HTTP request details.
     * @param {string} payload - The body payload of the request, if any.
     * @param {any} query - Query parameters from the request URL.
     * @param {any} params - Route parameters from the request URL.
     * @param {any} response - Response data returned by the controller or service.
     * @param {string} invokationRestMethod - The HTTP method (e.g., GET, POST) used in the request.
     * @param {string} invokationApiUrl - The full API URL invoked by the client.
     * @param {string} invokationIp - The IP address of the client making the request.
     * @param {string} invokationUserAgent - The user-agent string of the client.
     * @param {string} invokationController - The name of the controller handling the request.
     * @param {string} invokationMethod - The method in the controller handling the request.
     * @param {string} completionTime - The time taken to complete the request.
     * @param {number} statusCode - The HTTP status code returned in the response.
     */

    activityLogHandler(request: Request, payload: string, query: any, params: any, response: any, invokationRestMethod: string, invokationApiUrl: string, invokationIp: string, invokationUserAgent: string, invokationController: string, invokationMethod: string, completionTime: string, statusCode: number) {
        // Initialize loggerMapper with activity log details

        let loggerMapper = {} as ILoggerMapper;

        loggerMapper.invokationController = invokationController;
        loggerMapper.invokationRestMethod = invokationRestMethod;
        loggerMapper.invokationUserAgent = invokationUserAgent;
        loggerMapper.body = JSON.stringify(payload ?? '');
        loggerMapper.params = JSON.stringify(params ?? '');
        loggerMapper.query = JSON.stringify(query ?? '');
        loggerMapper.invokationMethod = invokationMethod;
        loggerMapper.invokationApiUrl = invokationApiUrl;
        loggerMapper.completionTime = completionTime;
        loggerMapper.invokationIp = invokationIp;
        loggerMapper.statusCode = statusCode;

        // Create and publish an activity log event

        const event = new ActivityLogEvent(request, loggerMapper);
        this.eventBus.publish(event)
    }


}
