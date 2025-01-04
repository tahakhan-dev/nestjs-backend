import { ILoggerMapper } from "src/common/interface/api-response";
import { IEvent } from "@nestjs/cqrs";
import { Request } from 'express';

/**
 * ActivityLogEvent
 *
 * This class represents an event that captures and processes activity logs in the application.
 * It implements the `IEvent` interface from the NestJS CQRS (Command Query Responsibility Segregation)
 * module, allowing it to be used in the event-driven architecture of the application.
 *
 * The event includes details about the HTTP request that triggered the activity and a logger mapper
 * for transforming and managing log data.
 */
export class ActivityLogEvent implements IEvent {
    /**
     * Constructor
     *
     * Initializes the `ActivityLogEvent` with the HTTP request details and the logger mapper.
     *
     * @param {Request} request - The Express.js request object containing details about the incoming HTTP request.
     * @param {ILoggerMapper} logMapper - A custom logger mapper interface used for structuring and managing log data.
     */
    constructor(
        public readonly request: Request,       // HTTP request triggering the event
        public readonly logMapper: ILoggerMapper // Logger mapper for log transformation and management
    ) { }
}
