import { ActivityLogEvent } from "./events/activity-log-event.event";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";

/**
 * ActivityLogEventHandler
 *
 * This class handles the `ActivityLogEvent` and performs the necessary actions
 * for logging user activity. It implements the `IEventHandler` interface from
 * the NestJS CQRS module, which ensures compatibility with the event-driven
 * architecture of the application.
 */
@EventsHandler(ActivityLogEvent) // Specifies that this handler listens for ActivityLogEvent
export class ActivityLogEventHandler implements IEventHandler<ActivityLogEvent> {
    /**
     * Logger Instance
     *
     * A logger instance from the NestJS Logger module, scoped to the `ActivityLogEventHandler` class,
     * for logging activity details and errors.
     */
    private readonly logger = new Logger(ActivityLogEventHandler.name);

    /**
     * Handle Method
     *
     * Processes the `ActivityLogEvent` and logs the user activity using the logger.
     * If an error occurs during processing, it logs the error details.
     *
     * @param {ActivityLogEvent} event - The event containing the HTTP request details and logger mapper
     *                                   for user activity logging.
     */
    handle(event: ActivityLogEvent) {
        try {
            // Logs the user activity details using the provided logger mapper
            this.logger.log(event.logMapper);

        } catch (error) {
            // Logs any errors that occur during the handling of the event
            this.logger.error(error);
        }
    }
}
