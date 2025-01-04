import { IEvent } from "@nestjs/cqrs";
import { Request } from 'express';
import { ILoggerMapper } from "src/common/interface/api-response";

export class ActivityLogEvent implements IEvent {
    constructor(
        public readonly request: Request,
        public readonly logMapper: ILoggerMapper
    ) { }
}
