import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasorces/log.datasorce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitis";

const prismaClient = new PrismaClient();

const severtyEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
};

export class PostgresLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severtyEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level:level,
            }
        });
        
        console.log('Postgres saved');
    };
    
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severtyEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where:{level}
        });

        return dbLogs.map( dbLog => LogEntity.fromObject( dbLog ) );
    };
    
};