import { logEntities, LogSeverityLevel } from "../entities/log.entitis";

export abstract class logDatasorce {
    abstract saveLog( log:logEntities ):Promise <void>;
    abstract getLog( severityLevel:LogSeverityLevel): Promise <logEntities[]>
};