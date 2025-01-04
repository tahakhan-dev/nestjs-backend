
import { Inject, Injectable } from "@nestjs/common"
import { EventBus } from "@nestjs/cqrs";
import { Request } from 'express';
import { ILoggerMapper } from "src/common/interface/api-response";
import { ActivityLogEvent } from "src/modules/users/events/activity-log-event.event";


@Injectable()
export class LoggingFunctions {  // class related to logging function 
    constructor(
        @Inject(EventBus) private readonly eventBus: EventBus,
    ) { }

    activityLogHandler(request: Request, payload: string, query: any, params: any, response: any, invokationRestMethod: string, invokationApiUrl: string, invokationIp: string, invokationUserAgent: string, invokationController: string, invokationMethod: string, completionTime: string, statusCode: number) {
        let loggerMapper = {} as ILoggerMapper;

        //  for activity logging
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


        const event = new ActivityLogEvent(request, loggerMapper);
        this.eventBus.publish(event)
    }


}
