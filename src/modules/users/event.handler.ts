import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ActivityLogEvent } from "./events/activity-log-event.event";
import { Logger } from "@nestjs/common";

@EventsHandler(ActivityLogEvent)
export class ActivityLogEventHandler implements IEventHandler<ActivityLogEvent> {
    private readonly logger = new Logger(ActivityLogEventHandler.name);

    handle(event: ActivityLogEvent) {
        try {
            // logs the user activity
            console.log(event.logMapper, '=============event.logMapper===============');

        } catch (error) {
            this.logger.error(error, '================ ActivityLogEvent Event =============');
        }
    }
}
