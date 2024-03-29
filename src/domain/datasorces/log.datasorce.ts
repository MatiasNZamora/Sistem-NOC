import { LogEntity, LogSeverityLevel } from "../entities/log.entitis";

export abstract class LogDatasource {
    abstract saveLog( log:LogEntity ):Promise <void>;
    abstract getLog( severityLevel:LogSeverityLevel): Promise <LogEntity[]>
};
