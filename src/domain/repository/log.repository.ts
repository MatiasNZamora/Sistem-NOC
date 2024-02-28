import { logEntities,LogSeverityLevel } from "../entities/log.entitis";

export abstract class logRepository {
    abstract saveLog( log:logEntities ):Promise <void>;
    abstract getLog( severityLevel:LogSeverityLevel): Promise <logEntities[]>
};